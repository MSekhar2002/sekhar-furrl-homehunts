import { useEffect, useState } from "react";
import axios from "axios";
import "./ProductList.css";
import CategoryFilters from "../CategoryFilter/CategoryFilters";
import ProductItem from "../ProductItem/ProductItem";
import LoadingSpinner from "../Loader/Loader";
import SvgIcon from "../shareIcon";

const initialProductState = {
    page: 0,
    pageSize: 10,
    totalPages: 10,
    totalProducts: 0,
    products: [],
};

const HomeDetails = () => {
    const [productData, setProductData] = useState(initialProductState);
    const [isLoading, setIsLoading] = useState(false);
    const [hasReachedEnd, setHasReachedEnd] = useState(false);
    const [filterOptions, setFilterOptions] = useState([]);
    const [activeFilter, setActiveFilter] = useState(null);


    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 20) {
                if (!hasReachedEnd) setHasReachedEnd(true);
            }
        };

        const handleResize = () => {
            if (window.innerWidth > 768) {
                window.location.href = "https://info.furrl.in/";
            }
        };

        window.addEventListener("scroll", handleScroll);
        window.addEventListener("resize", handleResize);

        // Perform initial check
        if (window.innerWidth > 768) window.location.href = "https://info.furrl.in/";

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleResize);
        };
    }, [hasReachedEnd]);

    const handleFilterChange = (filter) => {
        setProductData(initialProductState);
        setActiveFilter(filter);
        setHasReachedEnd(false);
    };

    const fetchProductData = async (page, activeFilter) => {
        if (page < productData.totalPages) {
            setIsLoading(true);
            const url = "https://api.furrl.in/api/v2/listing/getListingProducts";
            const requestBody = {
                input: {
                    page: page + 1,
                    pageSize: productData.pageSize,
                    filters: activeFilter ? { id: activeFilter.uniqueId, type: activeFilter.contentType } : [],
                    id: "#HomeHunts",
                    entity: "vibe",
                },
            };
            try {
                const response = await axios.post(url, requestBody);
                const data = response.data;
                setProductData((prevData) => ({
                    ...data.data.getListingProducts,
                    products: [...prevData.products, ...data.data.getListingProducts.products],
                    page: page + 1,
                }));
                setHasReachedEnd(false);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setIsLoading(false);
            }
        }
    };

    const fetchFilterOptions = async () => {
        const url = "https://api.furrl.in/api/v2/listing/getListingFilters";
        const requestBody = {
            id: "#HomeHunts",
            entity: "vibe",
        };
        try {
            const response = await axios.post(url, requestBody);
            const data = response.data;
            setFilterOptions(data.data.getListingFilters.easyFilters);
        } catch (error) {
            console.error("Error fetching filters:", error);
        }
    };

    useEffect(() => {
        fetchFilterOptions();
    }, []);

    useEffect(() => {
        setProductData(initialProductState); // Reset product data when filter changes
        fetchProductData(0, activeFilter); // Fetch new products based on the active filter
    }, [activeFilter]);

    useEffect(() => {
        if (hasReachedEnd) {
            fetchProductData(productData.page, activeFilter);
        }
    }, [hasReachedEnd, productData.page, activeFilter]);

    const renderProductItems = () => {
        return productData.products.map((product, index) => (
            <ProductItem key={product.id} productD={product} index={index} />
        ));
    };

    return (
        <>
            <div className="banner">
                <h2 className="banner-heading">#HomeHunts</h2>
                <div className="share-buttons">
                    <button className="share-button">
                        <SvgIcon />
                    </button></div>
            </div>
            <div className="products-wrapper">
                
                <p class="title">Shop Products <span class="dot"></span><span class="count">{productData.totalProducts} Products</span></p>
                <ul className="filter-tabs">
                    <li
                        onClick={() => handleFilterChange(null)}
                        className={activeFilter == null ? "active tab" : "tab"}
                    >
                        All
                    </li>
                    {filterOptions.map((option) => (
                        <CategoryFilters
                            key={option.uniqueId}
                            item={option}
                            className="tab"
                            activeFilter={activeFilter}
                            activeFilterChanged={handleFilterChange}
                        />
                    ))}
                </ul>
            </div>
            <ul className="products-list">{renderProductItems()}</ul>
            {isLoading && <LoadingSpinner />}
        </>
    );
};

export default HomeDetails;
