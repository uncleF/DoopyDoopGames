function getUrlParameter(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
    var results = regex.exec(location.search);
    return results === null
        ? ""
        : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function VKDirectPlatform() {
    this.viewerId = getUrlParameter("viewer_id");
    this.authKey = getUrlParameter("auth_key");
}

VKDirectPlatform.prototype.initialize = function (onSuccess, onFailure) {
    if (!vkBridge) {
        onFailure();
        console.log("Unable to resolve vkbridge");
        return;
    }
    vkBridge
        .send("VKWebAppInit", {})
        .then(onSuccess)
        .catch((error) => {
            onFailure();
            console.log("Unable to initialize vk api: " + JSON.stringify(error));
        });
    vkBridge
        .subscribe((event) => {
            if (event.detail.type === 'VKWebAppViewHide') {
                if (gameInstance) gameInstance.SendMessage("BrowserEvents", "MuteSounds");
            }
            else if (event.detail.type === 'VKWebAppViewRestore') {
                if (gameInstance) {
                    gameInstance.SendMessage("BrowserEvents", "UnmuteSounds");
                    gameInstance.SendMessage("BrowserEvents", "RestartMusic");
                }
            }
        });
};

VKDirectPlatform.prototype.getAuthFields = function () {
    return {
        apiType: 2,
        apiUid: this.viewerId,
        authSig: this.authKey,
        sessionKey: "-",
    };
};

VKDirectPlatform.prototype.getDefaultLocale = function () {
    return "ru";
};

VKDirectPlatform.prototype.getInstallReferrer = function () {
    return "";
};

VKDirectPlatform.prototype.loadUserProfile = function (onSuccess, onFailure) {
    vkBridge
        .send("VKWebAppGetUserInfo")
        .then((data) => {
            var avatar = data["photo_200"]
                ? data["photo_200"].indexOf("vk.com") >= 0
                    ? ""
                    : data["photo_200"]
                : "";
            onSuccess({
                firstName: userData.first_name,
                lastName: userData.last_name,
                avatar: avatar,
                gender: userData.sex === 1 ? 1 : 0,
            });
        })
        .catch((error) => {
            console.log("Unable to load player profile: " + JSON.stringify(error));
            onFailure("Unable to load player profile: " + JSON.stringify(error));
        });
};

VKDirectPlatform.prototype.buyProduct = function (productId, _productTitle, _productDescription, _productPrice, _productImage, onSuccess, onFailure) {
    vkBridge
        .send("VKWebAppShowOrderBox", { type: "item", item: productId })
        .then((data) => {
            if (data && data.success) {
                onSuccess(data.order_id);
            } else {
                var reason = (data && data.error_data && data.error_data.error_reason) || "unknown";
                console.log("Unable to purchase a product: " + reason);
                onFailure("Unable to purchase a product: " + reason);
            }
        })
        .catch((error) => {
            console.log("Unable to purchase a product: " + JSON.stringify(error));
            onFailure("Unable to purchase a product: " + JSON.stringify(error));
        });
};

window.SocialPlatformConstructor = VKDirectPlatform;
