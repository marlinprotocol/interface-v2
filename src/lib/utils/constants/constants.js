import { BigNumber } from 'ethers';
export var WALLET_TYPE;
(function (WALLET_TYPE) {
    WALLET_TYPE["metamask"] = "MetaMask";
    WALLET_TYPE["walletconnect"] = "WalletConnect";
})(WALLET_TYPE || (WALLET_TYPE = {}));
export const GET_OPTIONS = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
};
export const pondPrecisions = 2;
export const mPondPrecisions = 6;
export const amountPrecision = (token) => {
    switch (token) {
        case 'pond':
            return pondPrecisions;
        case 'mPond':
            return mPondPrecisions;
        default:
            return 2;
    }
};
export const BigNumberZero = BigNumber.from(0);
//# sourceMappingURL=constants.js.map