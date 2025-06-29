import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Filter from '../components/Filter';
import './FriendsListPage.css';


const FriendsListPage = () => {
    const [friends, setFriends] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [showFilters, setShowFilters] = useState(false);
    const [username, setUsername] = useState('');
    const [user, setUser] = useState(null);
    const [searchFriend, setSearchFriend] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const navigate = useNavigate();
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

    const handleSearch = async (queryParams) => {
        try {
            const res = await axios.get(`${BACKEND_URL}/api/movie/search`, {params : queryParams});
            navigate('/results', {state : {results: res.data}} );
        } catch (err) {
            console.error('Search failed', err);
        }
    }

    const handleSearchUser = async () => {
        if (!searchFriend.trim()) {
            return;
        };

        try {
            const res = await axios.get(`${BACKEND_URL}/api/friends/search`, {
                params: {query: searchFriend},
                withCredentials: true
            });

            const results = res.data.filter(
                (u) => u._id !== user._id && !friends.some(f => f._id === u._id)
            );

            if (results.length === 0) {
                alert('User not found');
            } else {
                setSearchResults(results);
            }
        } catch (err) {
            console.error('Search error', err);
            alert('Unable to search');
        }
    };

    const handleAddFriend = async (friendId) => {
        try {
            const res = await axios.post(`${BACKEND_URL}/api/friends/add`, {
                friendId,
                userId : user._id,
            }, {withCredentials:true}
            );
            
            alert('Friend added');

            const addedFriend = searchResults.find((user) => user._id === friendId);
            if (addedFriend) {
                setFriends((prev) => {
                    const alreadyExists = prev.some(f => f._id === friendId);
                    return alreadyExists ? prev : [...prev, addedFriend]
                });
            }
            setSearchResults([]);
            setSearchFriend('');
            setPage(1);
        } catch (err) {
            console.error('Add failed', err);
            alert('Unable to add friend');
        }
    }

    const removeFromFriendsList = async (friendId) => {
        try {
            await axios.post(`${BACKEND_URL}/api/friends/remove`, {friendId , userId : user._id}, { withCredentials: true});
            setFriends((prev) => prev.filter((f) => f._id !== friendId));
            alert('Remove success');
        } catch (err) {
            console.error('Failed to remove friend');
        }
    };

    const handleFriendsWatchedList = async (friendId) => {
        navigate(`/user/${friendId}/watched`);
    };

    const handleFriendsWishList = async (friendId) => {
        navigate(`/user/${friendId}/wish`);
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(`${BACKEND_URL}/api/retrieve`, {withCredentials: true});
                setUsername(res.data.user.username);
                setUser(res.data.user);
            } catch (err) {
                console.error('Failed to fetch username');
            }
        };
        fetchUser();
    }, []);

    useEffect(() => {
        const fetchFriends = async (pageNum) => {
            try {
                const res = await axios.get(`${BACKEND_URL}/api/friends/friendsList`, {
                    params: {page: pageNum},
                    withCredentials : true
                });
                setFriends(res.data.friends);
                setTotalPages(res.data.totalPages)
            } catch(err) {
                console.error('Failed to get friends', err);
                setFriends([]);
            }
        };
        fetchFriends(page);
    }, [page]);

    return (
        <div className='friendslist-container'>
            <Header onSearchBarFocus={() => !showFilters && setShowFilters(true)} onSearch={handleSearch}/>
            {showFilters && <Filter onSearch={handleSearch} onClose={()=> setShowFilters(false)}/>}
            
            <div className='friendlist-banner'>
                <h3>@{username || 'Username Not Loaded Yet'}</h3>
            </div>

            <div className='friend-search-container'>
                <input type='text' placeholder='Search Username...'
                value={searchFriend} onChange={(e) => setSearchFriend(e.target.value)}/>
                <button onClick={handleSearchUser}>Search</button>
                {searchResults.map((user) => (
                    <div key={user._id} className='search-user-result'>
                        @{user.username}
                        <button onClick={() => handleAddFriend(user._id)}>Add Friend</button>
                    </div>
                ))}
            </div>

            <div className='friendlist-table'>
                {friends.map((friend) => (
                    <div className='friend-row' key={friend._id}>
                        <span className='friend-username'>@{friend.username}</span>
                        <span className='friend-links'>
                            <button className='link-button' onClick={() => handleFriendsWatchedList}>WATCHED LIST</button>
                            <button className='link-button' onClick={() => handleFriendsWishList}>WISHLIST</button>
                            <button className='remove-button' onClick={() => removeFromFriendsList(friend._id)}>REMOVE</button>
                        </span>
                    </div>
                ))}
            </div>
            <div className="pagination">
                {[...Array(totalPages)].map((_, i) => (
                    <button
                    key={i}
                    className={i + 1 === page ? 'active' : ''}
                    onClick={() => setPage(i + 1)}
                >
                    {i+1}
                </button>
                ))}
            </div>
        </div>
    );
};

export default FriendsListPage;