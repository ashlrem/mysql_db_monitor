var nricFin, mobileNumber;

exports.setNricFin = function (idNo) {
    nricFin = idNo;
};

exports.setMobileNumber = function (mobileNo) {
    mobileNumber = mobileNo;
};

exports.getNricFin = function () {
    return nricFin;
};

exports.getMobileNumber = function () {
    return mobileNumber;
};

exports.getPersonInfo = function () {
    return {
        nricFin: nricFin,
        mobileNumber: mobileNumber,
    };
};