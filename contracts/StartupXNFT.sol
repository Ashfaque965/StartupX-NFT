// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Royalty.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

/**
 * @title StartupXNFT
 * @dev ERC-721 NFT contract for StartupX equity access perks
 * Represents early access to startup benefits without being regulated shares
 */
contract StartupXNFT is
    ERC721,
    ERC721Enumerable,
    ERC721Royalty,
    Ownable,
    AccessControl
{
    // Access tiers for different perks
    enum AccessTier {
        BRONZE, // Basic beta access
        SILVER, // Beta + Monthly founder calls
        GOLD, // Silver + Revenue sharing (5%)
        PLATINUM // Gold + Priority support + Governance tokens
    }

    // Role definitions
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant KYC_VERIFIER_ROLE = keccak256("KYC_VERIFIER_ROLE");

    // Structs
    struct NFTMetadata {
        AccessTier tier;
        uint256 mintedAt;
        string kycId;
        bool kycVerified;
    }

    struct TierDetails {
        uint256 maxSupply;
        uint256 currentMinted;
        uint256 revenueSharePercentage;
        bool revenueShareEnabled;
    }

    // State variables
    uint256 private _tokenIdCounter;
    mapping(uint256 => NFTMetadata) public nftMetadata;
    mapping(string => bool) public kycIdUsed; // Prevent duplicate KYC
    mapping(address => bool) public whitelistedAddresses;
    mapping(AccessTier => TierDetails) public tierDetails;

    bool public mintingEnabled = false;
    string public baseUri = "ipfs://";

    // Events
    event NFTMinted(
        address indexed to,
        uint256 indexed tokenId,
        AccessTier tier,
        string kycId
    );
    event KYCVerified(string indexed kycId, address indexed wallet);
    event TierUpdated(AccessTier tier, uint256 maxSupply, uint256 revenueShare);
    event MintingStatusChanged(bool enabled);

    // Constructor
    constructor() ERC721("StartupX NFT", "STARTUPX") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
        _grantRole(KYC_VERIFIER_ROLE, msg.sender);

        // Set royalty (5% to contract owner)
        _setDefaultRoyalty(msg.sender, 500);

        // Initialize tier details
        tierDetails[AccessTier.BRONZE] = TierDetails(
            1000, // 1000 max supply
            0,
            0,
            false
        );
        tierDetails[AccessTier.SILVER] = TierDetails(
            500, // 500 max supply
            0,
            0,
            false
        );
        tierDetails[AccessTier.GOLD] = TierDetails(
            250, // 250 max supply
            0,
            5,
            true
        );
        tierDetails[AccessTier.PLATINUM] = TierDetails(
            100, // 100 max supply
            0,
            10,
            true
        );
    }

    /**
     * @dev Mint NFT for verified KYC user
     * @param to Address to mint NFT to
     * @param tier Access tier
     * @param kycId KYC verification ID
     */
    function mintNFT(
        address to,
        AccessTier tier,
        string calldata kycId
    ) public onlyRole(MINTER_ROLE) returns (uint256) {
        require(mintingEnabled, "Minting is currently disabled");
        require(to != address(0), "Invalid recipient address");
        require(!kycIdUsed[kycId], "KYC ID already used");
        require(
            whitelistedAddresses[to],
            "Address not whitelisted"
        );

        TierDetails storage tierDetail = tierDetails[tier];
        require(
            tierDetail.currentMinted < tierDetail.maxSupply,
            "Tier max supply reached"
        );

        uint256 tokenId = _tokenIdCounter++;

        // Create metadata
        nftMetadata[tokenId] = NFTMetadata({
            tier: tier,
            mintedAt: block.timestamp,
            kycId: kycId,
            kycVerified: true
        });

        kycIdUsed[kycId] = true;
        tierDetail.currentMinted++;

        _safeMint(to, tokenId);

        emit NFTMinted(to, tokenId, tier, kycId);

        return tokenId;
    }

    /**
     * @dev Batch mint NFTs
     */
    function batchMint(
        address[] calldata recipients,
        AccessTier[] calldata tiers,
        string[] calldata kycIds
    ) public onlyRole(MINTER_ROLE) {
        require(
            recipients.length == tiers.length,
            "Array length mismatch"
        );
        require(recipients.length == kycIds.length, "Array length mismatch");

        for (uint256 i = 0; i < recipients.length; i++) {
            mintNFT(recipients[i], tiers[i], kycIds[i]);
        }
    }

    /**
     * @dev Verify KYC for an address
     */
    function verifyKYC(
        address wallet,
        string calldata kycId
    ) public onlyRole(KYC_VERIFIER_ROLE) {
        require(!kycIdUsed[kycId], "KYC ID already used");
        whitelistedAddresses[wallet] = true;
        emit KYCVerified(kycId, wallet);
    }

    /**
     * @dev Get NFT metadata
     */
    function getNFTMetadata(uint256 tokenId)
        public
        view
        returns (NFTMetadata memory)
    {
        require(_ownerOf(tokenId) != address(0), "Token does not exist");
        return nftMetadata[tokenId];
    }

    /**
     * @dev Get user NFTs
     */
    function getUserNFTs(address user)
        public
        view
        returns (uint256[] memory)
    {
        uint256 balance = balanceOf(user);
        uint256[] memory tokenIds = new uint256[](balance);

        for (uint256 i = 0; i < balance; i++) {
            tokenIds[i] = tokenOfOwnerByIndex(user, i);
        }

        return tokenIds;
    }

    /**
     * @dev Toggle minting status
     */
    function setMintingEnabled(bool enabled)
        public
        onlyRole(DEFAULT_ADMIN_ROLE)
    {
        mintingEnabled = enabled;
        emit MintingStatusChanged(enabled);
    }

    /**
     * @dev Update tier details
     */
    function updateTierDetails(
        AccessTier tier,
        uint256 maxSupply,
        uint256 revenueSharePercentage
    ) public onlyRole(DEFAULT_ADMIN_ROLE) {
        TierDetails storage tierDetail = tierDetails[tier];
        tierDetail.maxSupply = maxSupply;
        tierDetail.revenueSharePercentage = revenueSharePercentage;

        emit TierUpdated(tier, maxSupply, revenueSharePercentage);
    }

    /**
     * @dev Set base URI for metadata
     */
    function setBaseURI(string memory newBaseUri)
        public
        onlyRole(DEFAULT_ADMIN_ROLE)
    {
        baseUri = newBaseUri;
    }

    /**
     * @dev Get token URI
     */
    function tokenURI(uint256 tokenId)
        public
        view
        override
        returns (string memory)
    {
        require(_ownerOf(tokenId) != address(0), "Token does not exist");

        AccessTier tier = nftMetadata[tokenId].tier;
        string memory tierString;

        if (tier == AccessTier.BRONZE) tierString = "bronze";
        else if (tier == AccessTier.SILVER) tierString = "silver";
        else if (tier == AccessTier.GOLD) tierString = "gold";
        else tierString = "platinum";

        return
            string(
                abi.encodePacked(baseUri, tierString, "/", _toString(tokenId))
            );
    }

    // Helper function to convert uint to string
    function _toString(uint256 value) internal pure returns (string memory) {
        if (value == 0) {
            return "0";
        }
        uint256 temp = value;
        uint256 digits;
        while (temp != 0) {
            digits++;
            temp /= 10;
        }
        bytes memory buffer = new bytes(digits);
        while (value != 0) {
            digits -= 1;
            buffer[digits] = bytes1(uint8(48 + uint256(value % 10)));
            value /= 10;
        }
        return string(buffer);
    }

    // Required overrides
    function _update(
        address to,
        uint256 tokenId,
        address auth
    )
        internal
        override(ERC721, ERC721Enumerable)
        returns (address)
    {
        return super._update(to, tokenId, auth);
    }

    function _increaseBalance(address account, uint128 value)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._increaseBalance(account, value);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable, ERC721Royalty, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
