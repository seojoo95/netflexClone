import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { getGenre, getSearchResults } from "../axios/axios";
import Modal from "../components/layout/Modal";
import MovieItem from "../components/ui/MovieItem";

export default function SearchResult(){
    const {movieId} = useParams();
    const [genres, setGenres] = useState({});
    const navigate = useNavigate();
    
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const keyword = queryParams.get('keyword');
    
    const {data = []} = useQuery({
        queryKey : ['search', keyword],
        queryFn : ()=>getSearchResults(keyword),
        staleTime : 5000,
    })
    console.log(data)

    const imgVariants = {
        initial : {
            scale : 1,
            zIndex : 1
        },
        hover : {
            scale : 1.2,
            zIndex : 9,
            transition :{
                duration:0.5
            }
        }
    }

    const infoVariants = {
        initial : {
            opacity:0,
            scale:1,
            zIndex : 1
        },
        hover : {
            opacity:1,
            scale:1.3,
            zIndex : 99,
            transition:{
                duration:0.5
            }
        }
    }
    useEffect(()=>{
        const fetchGenres = async()=>{
            const genreData = await getGenre();
            const genreMap = genreData.reduce((acc, genre)=>{
                acc[genre.id] = genre.name;
                return acc
            }, {})
            setGenres(genreMap)
        }
        fetchGenres()
    }, [])
    const getRating = (adult) =>{
        return adult ? '청소년 관람 불가' : '전체 관람 가능'
    }
    const getGenresName = (genreId)=>{
        // if(!genreId) return console.log('장르 정보 없음');
        // if(genreId.length === 0) return console.log('장르 없음');
        // return genreId.map(id=>genres[id]).join(',');

        if(Array.isArray(genreId) && typeof genreId[0] === 'object'){
            const names = genreId.map(genre=>genre.name).filter(Boolean);
            return names.length ? names.join(', ') : '장르 정보 없음';
        }

        const ids = Array.isArray(genreId) ? genreId : [genreId];
        const names = ids.map(id=>genres[id]).filter(Boolean);
        return names.length ? names.join(', ') : '장르 정보 없음'
    }

    const handleModalClick=(movieId)=>{
        navigate({pathname : `${movieId}`, search : location.search})
    }
    const clickModal = movieId && data ? data.find((item)=> String(item.id) === movieId) : null;

    return(
        <SearchResultContainer>
            {(!data || data.length === 0) && <h2 className="resultText">검색 결과가 없습니다.</h2>}
            {Array.isArray(data) && data.length > 0 && (
                <div className="resultWrapper">
                    <div className="result">
                        <h3>{keyword} 검색한 결과 입니다.</h3>
                        <div className="resultList">
                            {data.map((movie, idx)=>(
                                <MovieItem
                                movie={movie}
                                id={movie.id}
                                // rate={rate}
                                getRating={getRating}
                                getGenresName = {getGenresName}
                                movieLength = {movie.length}
                                imgVariants = {imgVariants}
                                infoVariants = {infoVariants}
                                handleModalClick={handleModalClick}/>
                            ))}
                        </div>
                    </div>
                </div>
            )}
            {clickModal && <Modal movie={clickModal}/>}
        </SearchResultContainer>
    )
}
const SearchResultContainer = styled.div`
    width: 100%;
    height: 100%;
    background: #000;
    padding: 24px;
    box-sizing: border-box;
    padding-top: 300px;
    .resultText{
        color: #fff;
        font-size: 48px;
        font-weight: bold;
        text-align: center;
        margin-bottom: 100px;
    }
    .resultWrapper{
        .result{
            display: flex;
            flex-direction: column;
            gap: 30px;
            h3{
                color: #fff;
                font-size: 24px;
            }
            .resultList{
                display: flex;
                flex-wrap: wrap;
                gap: 24px;
                max-width: 70%;
                /* justify-content: center; */
                margin: 0 auto;
                >div{
                    width: 30%;
                }
            }
        }
    }
`