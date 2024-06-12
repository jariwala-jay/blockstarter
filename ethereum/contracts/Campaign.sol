pragma solidity ^0.4.17;

contract CampaignFactory {
    address[] public deployedCampaigns;

    function createCampaign(string memory title, string memory description, uint minimumContribution, string memory photoHash) public {
        address newCampaign = new Campaign(title, description, minimumContribution, msg.sender, photoHash);
        deployedCampaigns.push(newCampaign);
    }

    function getDeployedCampaigns() public view returns (address[] memory) {
        return deployedCampaigns;
    }
}

contract Campaign {
    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }

    Request[] public requests;
    address public manager;
    uint public minimumContribution;
    mapping(address => bool) public approvers;
    uint public approversCount;
    string public campaignTitle;
    string public campaignDescription;
    string public photoHash;

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    event PhotoHashSet(string photoHash);

    constructor(string memory title, string memory description, uint minimum, address creator, string memory _photoHash) public {
        manager = creator;
        minimumContribution = minimum;
        campaignTitle = title;
        campaignDescription = description;
        photoHash = _photoHash;
        emit PhotoHashSet(_photoHash);
    }

    function contribute() public payable {
        require(msg.value >= minimumContribution);
        approvers[msg.sender] = true;
        approversCount++;
    }

    function createRequest(string memory description, uint value, address recipient) public restricted {
        Request memory newRequest = Request({
            description: description,
            value: value,
            recipient: recipient,
            complete: false,
            approvalCount: 0 
        });
        requests.push(newRequest);
    }

    function approveRequest(uint index) public {
        Request storage request = requests[index];
        require(approvers[msg.sender]);
        require(!request.approvals[msg.sender]);
        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }

    function finalizeRequest(uint index) public restricted {
        Request storage request = requests[index];
        require(!request.complete);
        require(request.approvalCount > (approversCount / 2));

        request.recipient.transfer(request.value);
        request.complete = true;
    }

    function getSummary() public view returns(uint, uint, uint, uint, address, string memory) {
        return(
            minimumContribution,
            address(this).balance,
            requests.length,
            approversCount,
            manager,
            photoHash
        );
    }

    function getRequestCount() public view returns (uint) {
        return requests.length;
    }

    function setPhotoHash(string memory _photoHash) public restricted {
        photoHash = _photoHash;
        emit PhotoHashSet(_photoHash);
    }
}
