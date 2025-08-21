// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract EntangledLedger {
    struct Pair { address a; address b; uint256 balA; uint256 balB; bool active; }
    address public owner; address public relayer; uint256 public nextId; mapping(uint256=>Pair) public pairs;

    event PairCreated(uint256 id, address a);
    event PairJoined(uint256 id, address b);
    event Adjusted(uint256 id, address from, address to, uint256 amount);
    event Withdrawn(uint256 id, address who, uint256 amount);
    event RelayerChanged(address who);

    modifier onlyOwner(){ require(msg.sender==owner, 'ONLY_OWNER'); _; }
    modifier onlyParticipant(uint256 id){ Pair storage p=pairs[id]; require(msg.sender==p.a||msg.sender==p.b, 'NOT_PARTICIPANT'); _; }
    modifier onlyRelayer(){ require(msg.sender==relayer, 'ONLY_RELAYER'); _; }

    constructor(){ owner=msg.sender; relayer=msg.sender; }

    function setRelayer(address who) external onlyOwner { relayer=who; emit RelayerChanged(who); }

    function createPair() external payable returns(uint256 id){
        require(msg.value>0,'NO_DEPOSIT');
        id=++nextId;
        pairs[id]=Pair(msg.sender,address(0),msg.value,0,false);
        emit PairCreated(id,msg.sender);
    }

    function joinPair(uint256 id) external payable {
        Pair storage p=pairs[id];
        require(p.a!=address(0),'PAIR_NOT_EXISTS');
        require(!p.active,'ALREADY_ACTIVE');
        require(p.b==address(0),'ALREADY_JOINED');
        require(msg.value>0,'NO_DEPOSIT');
        p.b=msg.sender; p.balB+=msg.value; p.active=true;
        emit PairJoined(id,msg.sender);
    }

    function adjust(uint256 id, uint256 amount, bool fromAToB) external onlyParticipant(id){
        _adjust(id,amount,fromAToB);
    }

    function relayerAdjust(uint256 id, uint256 amount, bool fromAToB) external onlyRelayer {
        _adjust(id,amount,fromAToB);
    }

    function _adjust(uint256 id, uint256 amount, bool fromAToB) internal {
        Pair storage p=pairs[id];
        require(p.active,'NOT_ACTIVE');
        if(fromAToB){
            require(p.balA>=amount,'INSUFFICIENT_A');
            p.balA-=amount; p.balB+=amount;
            emit Adjusted(id,p.a,p.b,amount);
        } else {
            require(p.balB>=amount,'INSUFFICIENT_B');
            p.balB-=amount; p.balA+=amount;
            emit Adjusted(id,p.b,p.a,amount);
        }
    }

    function withdraw(uint256 id, uint256 amount) external onlyParticipant(id){
        Pair storage p=pairs[id];
        require(p.active || (p.a!=address(0)&&p.b!=address(0)),'NOT_READY');
        if(msg.sender==p.a){
            require(p.balA>=amount,'INSUFFICIENT_A');
            p.balA-=amount; (bool ok,)=msg.sender.call{value:amount}(''); require(ok,'TRANSFER_FAIL');
        } else {
            require(p.balB>=amount,'INSUFFICIENT_B');
            p.balB-=amount; (bool ok,)=msg.sender.call{value:amount}(''); require(ok,'TRANSFER_FAIL');
        }
        emit Withdrawn(id,msg.sender,amount);
    }

    function getPair(uint256 id) external view returns(address,address,uint256,uint256,bool){
        Pair memory p=pairs[id];
        return (p.a,p.b,p.balA,p.balB,p.active);
    }
}
