"use client";
import * as React from "react";
import { Box, Container, Typography, Alert } from "@mui/material";
import axios from "axios";

export default function Home() {
  const [data, setData] = React.useState([]);
  const getData = async () => {
    try {
      // Call data from API
      const res = await axios.get("http://localhost:8000/api/tickets");
      console.log(res.data);

      // Store data to local state(useState data)
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getData(); // execute function get data when first page rendered
  }, []);

  return (
    <Container maxWidth="xl" className="py-8 space-y-8">
      {/* Hero / Header Section */}
      <Box className="relative rounded-3xl bg-linear-to-r from-blue-600 to-indigo-600 p-8 md:p-12 text-white overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/4 blur-3xl" />
        <div className="relative z-10 max-w-2xl">
          <Typography
            variant="h3"
            component="h1"
            className="font-extrabold mb-4 tracking-tight"
          >
            Discover Unforgettable Experiences
          </Typography>
          <Typography variant="h6" className="text-blue-100 font-medium mb-8">
            Find the best concerts, workshops, and meetups happening near you.
          </Typography>

          {/* Search integrated in Hero */}
          {/* <div className="bg-white p-2 rounded-xl shadow-lg max-w-xl">
            <SearchBar onSearch={handleSearch} />
          </div> */}
        </div>
      </Box>

      {/* Filters */}
      {/* <EventFilters
        category={category}
        location={location}
        onCategoryChange={handleCategoryChange}
        onLocationChange={handleLocationChange}
      /> */}

      {/* Events Grid */}
      {/* <Box>
        <Typography
          variant="h5"
          className="font-bold mb-6 text-gray-800 border-l-4 border-blue-600 pl-3"
        >
          Upcoming Events
        </Typography>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <CircularProgress size={40} className="text-blue-600" />
          </div>
        ) : error ? (
          <Alert severity="error" className="mb-4">
            {error}
          </Alert>
        ) : events.length === 0 ? (
          <Box className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-300">
            <Typography variant="h6" className="text-gray-500">
              No events found matching your criteria.
            </Typography>
            <Typography variant="body2" className="text-gray-400 mt-2">
              Try adjusting your filters.
            </Typography>
          </Box>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </Box> */}

      {/* Pagination */}
      {/* {totalPages > 1 && (
        <Box className="flex justify-center mt-12">
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, p) => setPage(p)}
            color="primary"
            size="large"
            className="shadow-sm bg-white rounded-full px-4 py-2"
          />
        </Box>
      )} */}
    </Container>
  );
}
