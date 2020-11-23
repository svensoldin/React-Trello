import * as React from 'react';

import "./SearchBar.styles.css";

const SearchBar = () => {
	return(
		<div className="searchbar">
			<input type="text" placeholder="keyword..." className="search-input"/>
			<button className="search-btn"><span>Search</span></button>
		</div>
	);
};

export default SearchBar;