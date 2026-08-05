from sqlalchemy.orm import Session

from app import models, schemas


def create_contact(db: Session, data: schemas.ContactCreate) -> models.Contact:
    contact = models.Contact(**data.model_dump())
    db.add(contact)
    db.commit()
    db.refresh(contact)
    return contact


def create_pending_donation(db: Session, data: schemas.DonationOrderCreate) -> models.Donation:
    donation = models.Donation(
        full_name=data.full_name,
        email=data.email,
        phone=data.phone,
        pan_number=data.pan_number,
        address=data.address,
        city=data.city,
        state=data.state,
        pincode=data.pincode,
        amount=data.amount,
        consent_updates=data.consent_updates,
        payment_status="created",
    )
    db.add(donation)
    db.commit()
    db.refresh(donation)
    return donation


def attach_razorpay_order(db: Session, donation: models.Donation, order_id: str) -> models.Donation:
    donation.razorpay_order_id = order_id
    db.commit()
    db.refresh(donation)
    return donation


def get_donation(db: Session, donation_id: int) -> models.Donation | None:
    return db.get(models.Donation, donation_id)


def mark_donation_paid(
    db: Session, donation: models.Donation, payment_id: str, signature: str
) -> models.Donation:
    donation.razorpay_payment_id = payment_id
    donation.razorpay_signature = signature
    donation.payment_status = "paid"
    db.commit()
    db.refresh(donation)
    return donation
