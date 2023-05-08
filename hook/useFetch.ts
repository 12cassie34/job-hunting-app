import { useState, useEffect } from 'react'
import axios from 'axios'

export enum EndPoint {
    Search = 'Search',
    SearchFilters = 'search-filters',
    JobDetails = 'job-details',
    EstimatedSalary = 'estimated-salary'
}

interface UseFetch {
    endPoint: EndPoint,
    paramsValue: {
        query: string,
        page?: string,
        num_pages?: string
    }
}

const useFetch = ({ endPoint, paramsValue }: UseFetch) => {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(null)

    const options = {
        method: 'GET',
        url: `https://jsearch.p.rapidapi.com/${endPoint}`,
        params: {
           ...paramsValue
        },
        headers: {
            'X-RapidAPI-Key': '6f78b6e4b1msh6823370d1a09d15p17e08ejsnd0de8701873b',
            'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
        }
    }

    const fetchData = async () => {
        setIsLoading(true)
        
        try {
            const response = await axios.request(options)
            setData(response.data.data)
            setIsLoading(false)
        } catch (error) {
            setIsError(error)
            alert('Oops, something went wrong.')
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, []);

    const refetch = () => {
        setIsLoading(true)
        fetchData()
    }

    return { data, isError, isLoading, refetch }
}

export default useFetch