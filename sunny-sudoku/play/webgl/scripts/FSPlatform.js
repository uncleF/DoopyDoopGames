var fsclient;

function getUrlParameter(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
    var results = regex.exec(location.search);
    return results === null
        ? ""
        : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function includeScript(url, onSuccess, onError) {
    var script = document.createElement("script");
    script.onload = onSuccess;
    script.onerror = onError;
    script.src = url;
    document.head.appendChild(script);
}

function FSPlatform() {
    this.viewerId = getUrlParameter("viewerId");
    this.authKey = getUrlParameter("authKey");
    this.initialApiResult = this.extractInitialApiResult();
}

FSPlatform.prototype.extractInitialApiResult = function () {
    var apiResult = getUrlParameter("api_result");

    if (!apiResult) {
        console.log("Unable to get initial api result");
        return;
    }

    var data = JSON.parse(apiResult);
    if (data.response) {
        return data.response;
    } else {
        console.log("Unable to parse initial api result");
    }
};

FSPlatform.prototype.initialize = function (onSuccess, onFailure) {
    var fsapiUrl = getUrlParameter("fsapi");
    var appid = getUrlParameter("apiId");
    var clientKey = getUrlParameter("client_key");

    includeScript(
        fsapiUrl,
        function () {
            fsclient = new fsapi(appid, clientKey);
            fsclient.init(function () {
                console.log("Unable to initialize fsapi");
            });
            onSuccess();
        },

        function () {
            onFailure("Unable to load fsapi script");
        }
    );
};

FSPlatform.prototype.getAuthFields = function () {
    return {
        apiType: 7,
        apiUid: this.viewerId,
        authSig: this.authKey,
        sessionKey: "-",
    };
};

FSPlatform.prototype.getInstallReferrer = function () {
    return "";
};

FSPlatform.prototype.getDefaultLocale = function () {
    return "ru";
};

FSPlatform.prototype.buyProduct = function (
    productId,
    productTitle,
    _productDescription,
    productPrice,
    _productImage,
    onSuccess,
    onFailure
) {
    fsclient.event(
        "buyItemCallback",
        function (response) {
            if (response.result === "success")
                onSuccess(response.transactionId.toString());
            else
                onFailure(
                    response.result === "cancel"
                        ? "purchase cancelled"
                        : response.result === "close"
                        ? "window closed"
                        : response.result === "error"
                        ? "purchase error"
                        : "unknown reason"
                );
        },
        {
            name: productTitle,
            itemId: productId,
            priceFmCents: productPrice * 100,
        }
    );
};

FSPlatform.prototype.loadUserProfile = function (onSuccess, onFailure) {
    if (this.initialApiResult) {
        var userData = this.initialApiResult[this.viewerId];

        var avatar =
            userData["photo"] && userData["photo"].indexOf("nophoto") < 0
                ? userData["photo"]
                : "";

        onSuccess({
            firstName: userData["first_name"],
            lastName: userData["last_name"],
            avatar: avatar,
            gender: userData["sex"] === 1 ? 1 : 0,
        });
    } else {
        onFailure("Initial API result not found");
    }
};

window.SocialPlatformConstructor = FSPlatform;
