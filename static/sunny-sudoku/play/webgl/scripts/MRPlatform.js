function getUrlParameter(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
    var results = regex.exec(location.search);
    return results === null
        ? ""
        : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function MRPlatform() {
    this.viewerId = getUrlParameter("vid");
    this.authKey = getUrlParameter("authentication_key");
    this.sessionKey = getUrlParameter("session_key");
    this.privateKey = getUrlParameter("priv_key");
    this.purchaseResolve = undefined;
    this.purchaseReject = undefined;
}

MRPlatform.prototype.initialize = function (onSuccess, _onFailure) {
    mailru.loader.require(
        "api",
        function () {
            mailru.app.init(this.privateKey);

            mailru.events.listen(
                mailru.app.events.incomingPayment,
                this.onIncomingPayment.bind(this)
            );

            mailru.events.listen(
                mailru.app.events.paymentDialogStatus,
                this.onPaymentDialogStatus.bind(this)
            );

            onSuccess();
        }.bind(this)
    );
};

MRPlatform.prototype.getAuthFields = function () {
    return {
        apiType: 4,
        apiUid: this.viewerId,
        authSig: this.authKey,
        sessionKey: this.sessionKey,
    };
};

MRPlatform.prototype.getInstallReferrer = function () {
    return "";
};

MRPlatform.prototype.getDefaultLocale = function () {
    return "ru";
};

MRPlatform.prototype.buyProduct = function (
    productId,
    productTitle,
    _productDescription,
    productPrice,
    _productImage,
    onSuccess,
    onFailure
) {
    this.purchaseResolve = onSuccess;
    this.purchaseReject = onFailure;

    mailru.app.payments.showDialog({
        service_id: productId,
        service_name: productTitle,
        mailiki_price: productPrice,
    });
};

MRPlatform.prototype.loadUserProfile = function (onSuccess, onFailure) {
    mailru.common.users.getInfo(function (response) {
        if (response["error"]) {
            onFailure();
        } else {
            onSuccess({
                firstName: response[0]["first_name"],
                lastName: response[0]["last_name"],
                avatar:
                    response[0]["has_pic"] == 1 ? response[0]["pic_50"] : "",
                gender: response[0]["sex"],
            });
        }
    });
};

MRPlatform.prototype.onIncomingPayment = function (event) {
    if (event.status == "success") {
        this.purchaseResolve && this.purchaseResolve("");
    } else {
        this.purchaseReject && this.purchaseReject(event.status);
    }

    delete this.purchaseResolve;
    delete this.purchaseReject;
};

MRPlatform.prototype.onPaymentDialogStatus = function (event) {
    if (event.status == "closed") {
        this.purchaseReject && this.purchaseReject("cancelled");
        delete this.purchaseResolve;
        delete this.purchaseReject;
    }
};

window.SocialPlatformConstructor = MRPlatform;
