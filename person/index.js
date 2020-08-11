var nricFin, mobileNumber, authDate;

exports.setNricFin = function (idNo) {
    nricFin = idNo;
};

exports.setMobileNumber = function (mobileNo) {
    mobileNumber = mobileNo;
};

exports.getNricFin = function () {
    return nricFin;
};

exports.getauthDate = function(){
  return authDate;
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
