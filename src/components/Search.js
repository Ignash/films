import React, { useRef, useState, useEffect } from "react";
import styled from "@emotion/styled";
import { API_KEY, DELAY_SEARCH } from "../const";

const SectionSearch = styled.section`
    input {
        width: 330px;
        height: 30px;
        border: 1px solid #000;
        border-radius: 3px;
        display: block;
        padding: 0 10px;
    }
    &>div{
        position: relative;
    }
    margin: 30px 0;
    display: flex;
    justify-content: center;
    &>button{
        align-content: center;
        border-radius: 3px;
        height: 32px;
        margin-left: 15px;
        width: 100px;
        background-color: #49abdf;
        color #fff;
    }
    &>button:hover{
        background-color: #3cd0f5;
    }
`;
const CastomSelect = styled.ul`
    width: 100%;
    max-height: 120px;
    border: 1px solid #e4e4e4;
    border-radius: 3px;
    box-sizing: border-box;
    overflow: auto;
    position: absolute;
    z-index: 2;
    background-color: #fff;
    li {
        padding: 3px 10px;
        cursor: default;
    }
    li:hover {
        background-color: #e4e4e4;
    }
    li.selected {
        background-color: #3cd0f5;
    }
`;

const SelectedWords = styled.ul`
    display: flex;
    width: 355px;
    flex-wrap: wrap;
    li {
        padding: 3px 5px;
        border-color: #e4e4e4;
        color: #212529;
        background-color: #e4e4e4;
        border-radius: 3px;
        font-size: 0.8rem;
        height: 20px;
        line-height: 20px;
        margin: 0 3px 3px 0;
        flex-shrink: 0;
        button {
            font-size: 1.2rem;
            line-height: 1.2rem;
            padding: 0 3px;
        }
    }
`;

export default function Search({ changeSearch }) {
    const refInput = useRef("");
    const [searchKeyWords, setSearchKeyWords] = useState([]);
    const [selectedWords, setSelectedWords] = useState([]);

    const sectionSearchRef = useRef();

    let searchInAction = false;

    const handlerSearch = () => {
        if (searchInAction) return;
        if (refInput.current.value.length > 0) {
            searchInAction = true;
            return setTimeout(() => {
                if (!refInput.current.value.length) {
                    setSearchKeyWords([]);
                    return;
                }
                const query = refInput.current.value.replace(/\W/g,"%20");
                fetch(
                    `https://api.themoviedb.org/3/search/keyword?api_key=${API_KEY}&query=${query}&page=1`
                )
                    .then((response) => response.json())
                    .then((searchData) => {
                        setSearchKeyWords(searchData.results);
                    });
                searchInAction = false;
            }, DELAY_SEARCH);
        } else {
            setSearchKeyWords([]);
        }
    };

    const addSelectedWords = (event) => {
        let selected = searchKeyWords.find(
            (item) => item.name === event.target.textContent
        );
        if (!selectedWords.find((item) => item.name === event.target.textContent)) {
            setSelectedWords((prev) => [...prev, selected]);
            setSearchKeyWords([]);
            refInput.current.value = "";
        }
    };
    const deleteSelectedWord = (event) => {
        const name = event.target.previousSibling.textContent;
        setSelectedWords((prev) => {
            const newWords = prev.filter((item) => item.name !== name)
            changeSearch(newWords.map((item) => item.id));
            return newWords;
        });
    };

    useEffect(() => {
        refInput.current.focus();
        const handleClickOutside = (event) => {
            if (!sectionSearchRef.current.contains(event.target)) {
                refInput.current.value = "";
                setSearchKeyWords([]);
            }
        };
    
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    useEffect(()=>{
        const searchValues = selectedWords.map((item) => item.id);
        changeSearch(searchValues);
    }, [selectedWords, changeSearch])

    return (
        <SectionSearch>
            <div ref={sectionSearchRef}>
                <SelectedWords>
                    {selectedWords.map((item) => (
                        <li key={item.id + 1000}>
                            <span>{item.name}</span>
                            <button onClick={deleteSelectedWord}>&#215;</button>
                        </li>
                    ))}
                </SelectedWords>
                <input
                    ref={refInput}
                    type="text"
                    onChange={handlerSearch}
                />
                 {refInput.current.value && <CastomSelect>
                    {searchKeyWords?.map((item) => (
                        <li
                            key={item.id}
                            className={selectedWords.find((word) => word.name === item.name) ? "selected" : ""}
                            onClick={addSelectedWords}
                        >
                            {item.name}
                        </li>
                    ))}
                </CastomSelect>}
            </div>
        </SectionSearch>
    );
}
