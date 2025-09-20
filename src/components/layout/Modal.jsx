import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { getModalDetail } from "../../axios/axios";

export default function Modal({movie}){
    const {movieId} = useParams();
    const navigate = useNavigate();

    // console.log(movieId)
    const {data}=useQuery({
        queryKey : ['detail', movie.id],
        queryFn : ()=>getModalDetail(movie.id),
        staleTime : 5000
    })

    const fromDate = (date)=>{
        if(!date) return ""
        const resetDate = new Date(date);
        return `${resetDate.getFullYear()}`
    }

    const convertRuntime = (runtime)=>{
        const hours = Math.floor(runtime / 60);
        const min = runtime % 60;
        if(hours === 0) return `${min}분`
        return `${hours}시간 ${min}분`
    }
    return(
        <AnimatePresence>
            {movieId ? (
                <ModalWrapper
                animate={{opacity:1}}
                exit={{opacity:0}}
                >
                    <motion.div className="modalContent" transition={{duration:0.5}}>
                        <div className="modalBg">
                            <img src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} alt={movie.title} />
                        </div>
                        <div className="content">
                          <button className="closeBtn" 
                          onClick={()=>{navigate(-1)}}
                        //   이전 단계로 가는 값 -1
                          >X</button>
                          <div className="modalTextWrap">
                            <div className="modalText">
                                {data?.title&&<h2>{movie.title}</h2>}
                                <div>
                                    {data?.release_date && <span>{fromDate(movie.release_date)}</span>}
                                    {data?.runtime && <span>{convertRuntime(data.runtime)}</span>}
                                </div>
                                {data?.overview && <p className="modalOverview">{movie.overview}</p>}
                                <div className="infoGenres">
                                    장르 : <p>{data?.genres.map((genre, idx)=><span key={idx}>{genre.name}</span>)}</p>
                                </div>
                            </div>
                          </div>
                        </div>
                    </motion.div>
                    
                </ModalWrapper>
            ):null}
        </AnimatePresence>
        //AnimatePresence 마운트 될 때 연결시켜주는 애니메이션
    )
}
const ModalWrapper = styled.div`
    width: 100vw;
    height: 100vh;
    max-height: 100vh;
    background: rgba(0,0,0,0.7);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    box-sizing: border-box;
    .modalContent{
        position: relative;
        width: 50%;
        height: 100vh;
        max-height: 100vh;
        background: #333;
        z-index: 99;
        overflow: auto;
        img{
            width: 100%;
        }
        
        .closeBtn{
            position: absolute;
            top: 30px;
            right: 30px;
            font-size: 30px;
            width: 30px;
            height: 30px;
            border-radius: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            cursor: pointer;
        }
        .content{
            padding: 24px;
            box-sizing: border-box;
            .modalTextWrap{
                display: flex;
                flex-direction: column;
                gap: 24px;
                color: #fff;
                .modalText{
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                    div{
                        display: flex;
                        gap: 6px;
                        align-items: center;
                        span{
                            font-size: 20px;
                        }
                        h2{
                            font-size: 28px;
                        }
                    }
                    .modalOverview{
                            line-height: 1.5;
                            font-size: 14px;
                    }
                }
                .infoGenres{
                    display: flex;
                    gap: 12px;
                    align-items: center;
                    font-size: 20px;
                    p{
                        display: flex;
                        gap: 6px;
                        align-items: center;
                    }

                }
            }
        }
    }
`