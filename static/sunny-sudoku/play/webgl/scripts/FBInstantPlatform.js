function FBInstantPlatform() {
    this.viewerId = "";
    this.authSig = "";
}

FBInstantPlatform.prototype.initialize = function (onSuccess, onFailure) {
    FBInstant.player
        .getSignedPlayerInfoAsync()
        .then(
            function (result) {
                this.viewerId = result.getPlayerID();
                this.authSig = result.getSignature();
                onSuccess();
            }.bind(this)
        )
        .catch(function () {
            onFailure("Unable to get signed player info");
        });
};

FBInstantPlatform.prototype.getAuthFields = function () {
    return {
        apiType: 23,
        apiUid: this.viewerId,
        authSig: "",
        sessionKey: this.authSig,
    };
};

FBInstantPlatform.prototype.getInstallReferrer = function () {
    return "";
};

FBInstantPlatform.prototype.getDefaultLocale = function () {
    var locale = FBInstant.getLocale();
    if (!locale) return "en";
    return FBInstant.getLocale().split("_")[0] || "en";
};

FBInstantPlatform.prototype.buyProduct = function (
    _productId,
    _productTitle,
    _productDescription,
    _productPrice,
    _productImage,
    _onSuccess,
    _onFailure
) {};

FBInstantPlatform.prototype.getPlatform = function () {
    return FBInstant.getPlatform();
};

FBInstantPlatform.prototype.loadUserProfile = function (onSuccess, _onFailure) {
    onSuccess({
        firstName: FBInstant.player.getName(),
        lastName: "",
        avatar: FBInstant.player.getPhoto(),
        gender: 0,
    });
};

window.SocialPlatformConstructor = FBInstantPlatform;
