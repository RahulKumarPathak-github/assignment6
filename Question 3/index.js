`from datetime import datetime

class PaymentProcessingError(Exception):
    """Custom Exception class for payment processing errors."""
    pass

def processPayment(amount, card_number, expiration_date):
    """
    Simulates processing a payment transaction.
    
    Args:
        amount (float): The payment amount.
        card_number (str): The credit card number.
        expiration_date (str): The expiration date in the format 'MM/YY'.
    
    Raises:
        PaymentProcessingError: If any validation fails.
    """
    
    # Check if the payment amount is valid
    if not isinstance(amount, (int, float)) or amount <= 0:
        raise PaymentProcessingError("Invalid payment amount.")
    
    # Check if the card number is valid (assuming 16-digit card number for simplicity)
    if not card_number or not card_number.isdigit() or len(card_number) != 16:
        raise PaymentProcessingError("Invalid card number.")
    
    # Check if the expiration date is valid
    if not expiration_date:
        raise PaymentProcessingError("Invalid expiration date.")
    
    try:
        exp_month, exp_year = map(int, expiration_date.split('/'))
        exp_year += 2000 if exp_year < 100 else 0  # Convert 2-digit year to 4-digit year
        exp_date = datetime(exp_year, exp_month, 1)
        
        if exp_date < datetime.now():
            raise PaymentProcessingError("Invalid expiration date. Card has expired.")
    
    except ValueError:
        raise PaymentProcessingError("Invalid expiration date format. Use 'MM/YY'.")
    
    # Simulate payment processing logic (e.g., API calls to payment gateway)
    print("Payment processed successfully!")
    return True

# Example usage:
try:
    processPayment(100.50, "1234567812345678", "12/25")
except PaymentProcessingError as e:
    print(f"Payment failed: {e}")`