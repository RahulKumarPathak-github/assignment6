class   `LoginError(Exception)``:
    """Base class for login-related errors."""
    pass

class InvalidCredentialsError(LoginError):
    """Raised when the username or password is incorrect."""
    def _init_(self, message="Invalid username or password."):
        self.message = message
        super()._init_(self.message)

class MissingInputError(LoginError):
    """Raised when username or password is missing."""
    def _init_(self, field):
        self.message = f"{field} is required."
        super()._init_(self.message)

class AccountLockedError(LoginError):
    """Raised when the account is locked due to too many failed attempts."""
    def _init_(self, message="Your account is locked. Please contact support."):
        self.message = message
        super()._init_(self.message)

# Simulated database of users
users_db = {
    'john_doe': {'password': 'password123', 'locked': False},
    'jane_smith': {'password': 'mypassword', 'locked': True}
}

def login(username, password):
    # Check if username or password is missing
    if not username:
        raise MissingInputError("Username")
    if not password:
        raise MissingInputError("Password")
    
    # Check if the user exists
    if username not in users_db:
        raise InvalidCredentialsError()

    user = users_db[username]

    # Check if the account is locked
    if user['locked']:
        raise AccountLockedError()
    
    # Check if the password is correct
    if user['password'] != password:
        raise InvalidCredentialsError()

    # Simulate successful login
    return f"Welcome, {username}!"

# Example usage:
try:
    print(login("john_doe", "password123"))  # Successful login
    print(login("jane_smith", "mypassword"))  # Account locked
except LoginError as e:
    print(e)