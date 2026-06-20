// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";

/**
 * @title KYCVerifier
 * @dev Contract to manage KYC verification linked to wallet addresses
 */
contract KYCVerifier is AccessControl {
    bytes32 public constant KYC_ADMIN_ROLE = keccak256("KYC_ADMIN_ROLE");

    enum KYCStatus {
        PENDING,
        VERIFIED,
        REJECTED,
        EXPIRED
    }

    struct KYCRecord {
        address wallet;
        string kycId;
        KYCStatus status;
        uint256 verifiedAt;
        uint256 expiresAt;
        string documentHash; // IPFS hash of submitted documents
    }

    // Mappings
    mapping(string => KYCRecord) public kycRecords; // KYC ID => Record
    mapping(address => string) public walletToKycId; // Wallet => KYC ID
    mapping(address => bool) public approvedWallets; // Quick verification check

    // Events
    event KYCSubmitted(string indexed kycId, address indexed wallet);
    event KYCVerified(string indexed kycId, address indexed wallet);
    event KYCRejected(string indexed kycId, string reason);
    event KYCExpired(string indexed kycId);

    uint256 public kycValidityDays = 365; // 1 year validity

    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(KYC_ADMIN_ROLE, msg.sender);
    }

    /**
     * @dev Submit KYC for verification
     * Called by backend after document verification
     */
    function submitKYC(
        address wallet,
        string calldata kycId,
        string calldata documentHash
    ) public onlyRole(KYC_ADMIN_ROLE) {
        require(wallet != address(0), "Invalid wallet address");
        require(bytes(kycId).length > 0, "KYC ID required");

        KYCRecord storage record = kycRecords[kycId];
        require(
            record.status == KYCStatus.PENDING || record.verifiedAt == 0,
            "KYC record already exists"
        );

        record.wallet = wallet;
        record.kycId = kycId;
        record.status = KYCStatus.PENDING;
        record.documentHash = documentHash;

        walletToKycId[wallet] = kycId;

        emit KYCSubmitted(kycId, wallet);
    }

    /**
     * @dev Verify KYC record
     */
    function verifyKYC(string calldata kycId)
        public
        onlyRole(KYC_ADMIN_ROLE)
    {
        KYCRecord storage record = kycRecords[kycId];
        require(record.wallet != address(0), "KYC record not found");
        require(record.status == KYCStatus.PENDING, "KYC already processed");

        record.status = KYCStatus.VERIFIED;
        record.verifiedAt = block.timestamp;
        record.expiresAt = block.timestamp + (kycValidityDays * 1 days);

        approvedWallets[record.wallet] = true;

        emit KYCVerified(kycId, record.wallet);
    }

    /**
     * @dev Reject KYC record
     */
    function rejectKYC(string calldata kycId, string calldata reason)
        public
        onlyRole(KYC_ADMIN_ROLE)
    {
        KYCRecord storage record = kycRecords[kycId];
        require(record.wallet != address(0), "KYC record not found");

        record.status = KYCStatus.REJECTED;
        approvedWallets[record.wallet] = false;

        emit KYCRejected(kycId, reason);
    }

    /**
     * @dev Check if wallet is KYC verified and not expired
     */
    function isVerified(address wallet) public view returns (bool) {
        string memory kycId = walletToKycId[wallet];
        if (bytes(kycId).length == 0) return false;

        KYCRecord memory record = kycRecords[kycId];
        return (record.status == KYCStatus.VERIFIED &&
            block.timestamp <= record.expiresAt);
    }

    /**
     * @dev Get KYC status for wallet
     */
    function getKYCStatus(address wallet)
        public
        view
        returns (KYCStatus)
    {
        string memory kycId = walletToKycId[wallet];
        if (bytes(kycId).length == 0) return KYCStatus.PENDING;

        KYCRecord memory record = kycRecords[kycId];

        if (block.timestamp > record.expiresAt && record.expiresAt > 0) {
            return KYCStatus.EXPIRED;
        }

        return record.status;
    }

    /**
     * @dev Get KYC record
     */
    function getKYCRecord(string calldata kycId)
        public
        view
        returns (KYCRecord memory)
    {
        return kycRecords[kycId];
    }

    /**
     * @dev Update KYC validity period
     */
    function setKYCValidityPeriod(uint256 days_)
        public
        onlyRole(DEFAULT_ADMIN_ROLE)
    {
        require(days_ > 0, "Validity period must be greater than 0");
        kycValidityDays = days_;
    }
}
