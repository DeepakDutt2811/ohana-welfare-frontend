import razorpay

from app.config import RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET

_client: razorpay.Client | None = None


def get_client() -> razorpay.Client:
    global _client
    if _client is None:
        _client = razorpay.Client(auth=(RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET))
    return _client


def create_order(amount_rupees: float, currency: str, receipt: str) -> dict:
    client = get_client()
    return client.order.create(
        {
            "amount": int(round(amount_rupees * 100)),  # paise
            "currency": currency,
            "receipt": receipt,
            "payment_capture": 1,
        }
    )


def verify_payment_signature(order_id: str, payment_id: str, signature: str) -> bool:
    client = get_client()
    try:
        client.utility.verify_payment_signature(
            {
                "razorpay_order_id": order_id,
                "razorpay_payment_id": payment_id,
                "razorpay_signature": signature,
            }
        )
        return True
    except razorpay.errors.SignatureVerificationError:
        return False
