class ProductNotFoundError extends Error {
    constructor(productId) {
        super(`Product with ID ${productId} not found.` );
        this.name = 'ProductNotFoundError';
    }
}

function addToCart(cart, productId, quantity) {
    const product = getProductById(productId);
    if (!product) {
        throw new ProductNotFoundError(productId);
    }

    if (quantity <= 0) {
        throw new Error("Quantity must be greater than zero.");
    }

    cart.addProduct(product, quantity);
}


class OutOfStockError extends Error {
    constructor(productId, availableStock) {
        super(`Product with ID ${productId} is out of stock. Only ${availableStock} left.`);
        this.name = 'OutOfStockError';
    }
}


function checkStock(product, quantity) {
    if (product.stock < quantity) {
        throw new OutOfStockError(product.id, product.stock);
    }
}

class InvalidPaymentInformationError extends Error {
    constructor() {
        super("Invalid payment details provided.");
        this.name = 'InvalidPaymentInformationError';
    }
}

function processPayment(paymentInfo) {
    if (!isValidPaymentInfo(paymentInfo)) {
        throw new InvalidPaymentInformationError();
    }
    // Continue processing payment
}

class PaymentFailedError extends Error {
    constructor(reason) {
        super(`Payment failed due to: ${reason}.`);
        this.name = 'PaymentFailedError';
    }
}


async function processPayment(paymentInfo) {
    try {
        const response = await paymentGateway.process(paymentInfo);
        if (response.status !== 'success') {
            throw new PaymentFailedError(response.errorMessage);
        }
    } catch (error) {
        throw new PaymentFailedError("Payment gateway timeout.");
    }
}

class EmptyCartError extends Error {
    constructor() {
        super("Cannot proceed to checkout with an empty cart.");
        this.name = 'EmptyCartError';
    }
}

function checkout(cart) {
    if (cart.isEmpty()) {
        throw new EmptyCartError();
    }
}

class InvalidAddressError extends Error {
    constructor() {
        super("Invalid shipping address.");
        this.name = 'InvalidAddressError';
    }
}


function validateAddress(address) {
    if (`!isValidAddress(address)`) {
        throw new InvalidAddressError();
    }
}


function handleCheckout(cart, paymentInfo, shippingAddress) {
    try {
        if (cart.isEmpty()) {
            throw new EmptyCartError();
        }

        validateAddress(shippingAddress);
        const totalAmount = cart.calculateTotal();

        processPayment(paymentInfo);

        cart.clear();  // Clear cart after successful payment

        return "Order placed successfully!";
    } catch (error) {
        if (error instanceof ProductNotFoundError ||
            error instanceof OutOfStockError ||
            error instanceof InvalidAddressError ||
            error instanceof InvalidPaymentInformationError ||
            error instanceof PaymentFailedError ||
            error instanceof EmptyCartError) {
            return `Checkout failed: ${error.message}`;
        } else {
            return `An unexpected error occurred: ${error.message}`;
        }
    }
}

function handleCheckout(cart, paymentInfo, shippingAddress) {
    try {
        if (cart.isEmpty()) {
            throw new EmptyCartError();
        }

        validateAddress(shippingAddress);
        const totalAmount = cart.calculateTotal();

        processPayment(paymentInfo);

        cart.clear();

        return "Order placed successfully!";
    } catch (error) {
        console.error(error);  // Logging the error for debugging
        if (error instanceof ProductNotFoundError ||
            error instanceof OutOfStockError ||
            error instanceof InvalidAddressError ||
            error instanceof InvalidPaymentInformationError ||
            error instanceof PaymentFailedError ||
            error instanceof EmptyCartError) {
            return `Checkout failed: ${error.message};
        } else {
            return An unexpected error occurred: ${error.message}`;
        }
    }
}