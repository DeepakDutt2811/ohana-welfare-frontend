from datetime import datetime

from pydantic import BaseModel, EmailStr, Field


class ContactCreate(BaseModel):
    name: str = Field(min_length=1, max_length=150)
    email: EmailStr
    phone: str | None = Field(default=None, max_length=20)
    subject: str = Field(default="general", max_length=50)
    message: str = Field(min_length=1, max_length=2000)


class ContactOut(BaseModel):
    id: int
    name: str
    email: EmailStr
    subject: str
    created_at: datetime

    model_config = {"from_attributes": True}


class DonationOrderCreate(BaseModel):
    full_name: str = Field(min_length=1, max_length=150)
    email: EmailStr
    phone: str = Field(min_length=1, max_length=20)
    pan_number: str | None = Field(default=None, max_length=10)
    address: str | None = Field(default=None, max_length=255)
    city: str | None = Field(default=None, max_length=100)
    state: str | None = Field(default=None, max_length=100)
    pincode: str | None = Field(default=None, max_length=10)
    amount: float = Field(gt=0)
    consent_updates: bool = False


class DonationOrderOut(BaseModel):
    donation_id: int
    razorpay_order_id: str
    razorpay_key_id: str
    amount: float
    currency: str


class DonationVerify(BaseModel):
    donation_id: int
    razorpay_order_id: str
    razorpay_payment_id: str
    razorpay_signature: str


class DonationOut(BaseModel):
    id: int
    full_name: str
    email: EmailStr
    amount: float
    currency: str
    payment_status: str
    created_at: datetime

    model_config = {"from_attributes": True}
