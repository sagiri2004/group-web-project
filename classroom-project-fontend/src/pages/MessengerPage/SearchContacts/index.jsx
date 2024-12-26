import React from "react";
import {
  Box,
  TextField,
  Avatar,
  Typography,
  ListItemAvatar,
  ListItemText,
  InputAdornment,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import SearchIcon from "@mui/icons-material/Search"; // Importing MUI Search Icon

const SearchContacts = ({
  searchQuery,
  setSearchQuery,
  searchContacts,
  handleSearchSelect,
}) => {
  return (
    <Box p={2}>
      <Autocomplete
        fullWidth
        size="small"
        options={searchContacts}
        getOptionLabel={(option) => option.name || ""}
        value={
          searchContacts.find((contact) => contact.name === searchQuery) || null
        }
        onChange={(event, newValue) => {
          handleSearchSelect(newValue);
          setSearchQuery(newValue?.name || "");
        }}
        inputValue={searchQuery}
        onInputChange={(event, newInputValue) => {
          setSearchQuery(newInputValue);
        }}
        noOptionsText="No contacts found"
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Search contacts"
            variant="outlined"
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />{" "}
                  {/* Replacing custom avatar with MUI Search Icon */}
                </InputAdornment>
              ),
            }}
          />
        )}
        renderOption={(props, option) => (
          <li {...props} key={option.id}>
            <ListItemAvatar>
              <Avatar src={option.avatar} alt={option.name} />
            </ListItemAvatar>
            <ListItemText primary={option.name} />
          </li>
        )}
      />
    </Box>
  );
};

export default SearchContacts;
