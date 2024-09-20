// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract NestageNw {
    using SafeMath for uint256;

    address payable public admin;
    address payable public referralAdmin;
    uint256 public nextStakeId;
    uint256 public constant registrationFee = 10 * 10 ** 18; // 10 BNB (assuming 18 decimal places)
    uint256 public constant SCALE = 100;
    uint256 public constant One = 40;
    uint256 public constant Two = 20;
    uint256 public constant Three = 15;
    uint256[] private _rates = [40, 20, 15];

    struct User {
        address referrer;
        uint256 reward;
        address[] referrals;
    }

    mapping(address => User) public users;

    struct Stake {
        uint256 id;
        uint256 amount;
        uint256 startDate;
        uint256 endDate;
        uint256 profit;
        address staker;
    }

    mapping(uint256 => Stake) public stakes;
    mapping(address => uint256[]) private stakerToStakes;

    constructor() {
        admin = payable(msg.sender);
        referralAdmin = payable(msg.sender);
    }

    // receive() external payable {}

    function startNewStake(
        address _admin,
        uint256 _startDate,
        uint256 _endDate,
        uint256 _profit,
        bool _hasRef,
        address _ref,
        uint256 _pay
    ) public payable {
        uint256 _amount = msg.value;
        require(_amount > 0, "Amount must be greater than 0");
        require(
            _startDate >= block.timestamp,
            "Start date must be in the future"
        );
        require(_endDate > _startDate, "End date must be after start date");
        require(_profit >= 0, "Profit must be non-negative");

        uint256 stakeId = nextStakeId++;
        stakes[stakeId] = Stake({
            id: stakeId,
            amount: _amount,
            startDate: _startDate,
            endDate: _endDate,
            profit: _profit,
            staker: msg.sender
        });

        stakerToStakes[msg.sender].push(stakeId);

        uint256 amt = 0;

        if (_hasRef) {
            amt = _amount - _pay;
            _amount = amt;
            payable(_ref).transfer(_pay);
        }
        payable(_admin).transfer(_amount);
    }

    function distributeUserProfit(
        address[] memory _stakers,
        uint256[] memory _stakersProfits
    ) public payable {
        uint256 amount = msg.value;

        uint256 amt;
        uint256 len = _stakers.length;

        for (uint256 i = 0; i < len; i++) {
            amt = (amount * _rates[i]) / SCALE;
            payable(_stakers[i]).transfer(_stakersProfits[i]);
        }
    }

    function getAllStakes() public view returns (Stake[] memory) {
        Stake[] memory allStakes = new Stake[](nextStakeId);

        for (uint256 i = 0; i < nextStakeId; i++) {
            allStakes[i] = stakes[i];
        }

        return allStakes;
    }

    function startNewReferral(
        address[] memory _users,
        address _refAdmin
    ) public payable {
        uint256 amount = msg.value;

        uint256 amt;
        uint256 len = _users.length;
        uint256 didTransfer = 0;

        if (len > 0) {
            for (uint256 i = 0; i < len; i++) {
                amt = (amount * _rates[i]) / SCALE;
                didTransfer += amt;
                payable(_users[i]).transfer(amt);
            }
            uint256 adminReward = amount - didTransfer;
            payable(_refAdmin).transfer(adminReward);
        } else {
            payable(_refAdmin).transfer(amount);
        }
    }
}
