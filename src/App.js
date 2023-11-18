// Import necessary dependencies
import React, { useState, useEffect } from 'react';
import data from "./data";
import './App.css';
import FilterBox from './Components/FilterBox';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import Button from '@mui/material/Button';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

// Sample JSON data
const mockApiResponse = {
  data: data,
  page: 1,
  per_page: 10,
  total: 100,
};

const App = () => {
  const [cards, setCards] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState([]);
  const [ownerId, setOwnerId] = useState('');
  const [serachId, setSearchId] = useState('');
  const [status, setStatus] = useState('');
  const [isFilterBoxOpen, setIsFilterBoxOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, filterType, ownerId, status]);

  const fetchData = () => {
    // Simulate API call
    // Replace this with actual API call
    const startIndex = (currentPage - 1) * mockApiResponse.per_page;
    const endIndex = startIndex + mockApiResponse.per_page;
    const filteredData = mockApiResponse.data
      .filter((card) => (ownerId === '' || ownerId == card.owner_id) && (filterType.length == 0 || filterType.includes(card.card_type)) && (status === '' || status === card.status))
      .slice(startIndex, endIndex);
    setCards(filteredData);
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset page when searching
  };

  const handleOwnerIdSearch = (e) => {
    setSearchId(e.target.value)
  }

  const handleFilterChange = (e) => {
    setFilterType(e.target.value);
    setCurrentPage(1); // Reset page when changing filter
  };

  const filteredCards = cards.filter(
    (card) =>
      card.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <nav>
        <input
          type="text"
          value={serachId}
          onChange={handleOwnerIdSearch}
          placeholder='Enter owner id'
        />
        <button
          onClick={() => {
            setOwnerId(serachId);
            setStatus('');
          }}
          className={filterType === 'your' ? 'active' : ''}
        >
          Your
        </button>
        <button
          onClick={() => {
            setOwnerId('');
            setStatus('');
            setSearchId('')
          }}
          className={filterType === 'all' ? 'active' : ''}
        >
          All
        </button>
        <button
          onClick={() => {
            setStatus('blocked')
            setOwnerId('');
            setSearchId('')
          }}
          className={filterType === 'blocked' ? 'active' : ''}
        >
          Blocked
        </button>
      </nav>
      <div style={{paddingLeft: '10px'}}>
        <label htmlFor="search">Search by Card Name: </label>
        <input
          type="text"
          id="search"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      {!isFilterBoxOpen && <Button style={{marginLeft: '10px'}} onClick={()=>{
        setIsFilterBoxOpen(true)
        setIsFilterBoxOpen(!isFilterBoxOpen)
      }} variant="outlined" startIcon={<FilterAltIcon />}>
        Filter
      </Button>}
      {isFilterBoxOpen && <FilterBox setFilterType={setFilterType} setIsFilterBoxOpen = {setIsFilterBoxOpen} selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters}/>}
      <div className='card-container'>
        {filteredCards.map((card, index) => (
          <div key={index} className={`card ${card.card_type}`}>
            <div style={{backgroundColor: card.card_type === 'subscription' ? "red" : "orange"}}>{card.card_type.toUpperCase()}</div>
            <div>{card.card_type === 'subscription' ? <><SubscriptionsIcon/><SubscriptionsIcon/><SubscriptionsIcon/></> : <><LocalFireDepartmentIcon /><LocalFireDepartmentIcon /><LocalFireDepartmentIcon /></>}</div>
            <div style={{color: "mediumorchid"}}>{card.name} </div>
            <div>{card.budget_name}</div>
            <div><spam style={{color:"red"}}>Spent:</spam> {card.spent.value} {card.spent.currency}</div> 
            <div><spam style={{color:"green"}}>Available:</spam> {card.available_to_spend.value} {card.available_to_spend.currency}</div> 
            {card.card_type === 'burner' ? (
              <div style={{color: "burlywood"}}>Expiry: {card.expiry}</div>
            ) : (
              <div style={{color: "burlywood"}}> Limit: {card.limit}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
