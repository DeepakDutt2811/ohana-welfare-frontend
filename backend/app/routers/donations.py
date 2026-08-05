import razorpay.errors
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app import crud, payments, schemas
from app.config import RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET
from app.database import get_db

router = APIRouter(prefix="/api/donations", tags=["donations"])


@router.post("/create-order", response_model=schemas.DonationOrderOut, status_code=201)
def create_order(payload: schemas.DonationOrderCreate, db: Session = Depends(get_db)):
    if not RAZORPAY_KEY_ID or not RAZORPAY_KEY_SECRET:
        raise HTTPException(
            status_code=503,
            detail="Payment gateway is not configured yet. Set RAZORPAY_KEY_ID and "
            "RAZORPAY_KEY_SECRET in backend/.env.",
        )

    donation = crud.create_pending_donation(db, payload)

    try:
        order = payments.create_order(
            amount_rupees=payload.amount,
            currency="INR",
            receipt=f"donation-{donation.id}",
        )
    except razorpay.errors.BadRequestError as exc:
        raise HTTPException(
            status_code=502, detail=f"Payment gateway rejected the request: {exc}"
        ) from exc

    donation = crud.attach_razorpay_order(db, donation, order["id"])

    return schemas.DonationOrderOut(
        donation_id=donation.id,
        razorpay_order_id=order["id"],
        razorpay_key_id=RAZORPAY_KEY_ID,
        amount=payload.amount,
        currency="INR",
    )


@router.post("/verify", response_model=schemas.DonationOut)
def verify_payment(payload: schemas.DonationVerify, db: Session = Depends(get_db)):
    donation = crud.get_donation(db, payload.donation_id)
    if donation is None:
        raise HTTPException(status_code=404, detail="Donation not found")

    if donation.razorpay_order_id != payload.razorpay_order_id:
        raise HTTPException(status_code=400, detail="Order ID mismatch")

    is_valid = payments.verify_payment_signature(
        payload.razorpay_order_id, payload.razorpay_payment_id, payload.razorpay_signature
    )
    if not is_valid:
        raise HTTPException(status_code=400, detail="Payment signature verification failed")

    return crud.mark_donation_paid(
        db, donation, payload.razorpay_payment_id, payload.razorpay_signature
    )
