import React, { useState, useEffect, useCallback } from "react";
import styled, { css } from "styled-components";
import { Link, useParams } from "react-router-dom";
import { SearchBar } from "./SearchBar";
import SearchResults from "./SearchResults";

import  { ResponseData } from "../types"
import { DivFlexCenter } from "../globals/styles";
import LoadingDots from "./LoadingDots";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: row;
    align-items: left;
    justify-content: space-between;
    background-color: ${theme.colors.secondary};
    padding: 1rem;
    color: ${theme.colors.primary};
  `}
`;

const Icon = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    font-size: 1.25rem;
    padding: 0.25rem;
    color: ${theme.colors.secondary};
    cursor: pointer;
    &:hover {
      border-radius: 10px;
      padding: 0.25rem;
      border: 1px solid ${theme.colors.secondary};
    }
  `}
`;

const IconLink = styled(Link)`
  ${({ theme }) => css`
    text-decoration: none;
    display: flex;
    align-items: center;
    font-size: 1.5rem;
    color: ${theme.colors.primary};
  `}
`;

const ResultsWrapper = styled.div`
  display: flex;
  gap: 2rem;
  padding: 1rem;
  font-size: 0.8rem;
`;

const TotalResults = styled.div`
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: left;
`;
const List = styled.div`
  display: flex;
  flex-direction: column;
  width: 75%;
  @media screen and (max-width: 800px) {
    width: 100%;
  }
`;

const Loading = styled(DivFlexCenter)`
  height: 50vh;
  top: 25%;
  left: 50%;
`;

const Pagination = styled(DivFlexCenter)`
  gap: 2rem;
  padding: 1rem;
  font-size: 0.8rem;
`;

function Results() {
  const initialState = {
    items: [],
    total_count: 0,
  };

  const [data, setData] = useState<ResponseData>(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [filteredResults, setFilteredResults] = useState<ResponseData>(initialState);
  const [page, setPage] = useState(1);

  //get params from url
  let { q } = useParams();

  const fetchData = useCallback(
    ({ input, page }: { input?: string; page?: number; }) => {
      setLoading(true);

      //Query Parameters - Reference: https://docs.github.com/en/rest/reference/repos
      const queryTerm = `q=` + encodeURIComponent(input || '');
      const queryPerPage = `&per_page=${30}`;
      const queryPage = `&page=${page || 1}`;
      const queryString =
        queryTerm + queryPerPage + queryPage;

      let url = `https://api.github.com/search/repositories?${queryString}`;

      fetch(url, {
        headers: {
          Authorization: `bearer ${process.env.REACT_APP_GH_TOKEN}`
        }
      })
        .then((response) => response.json())
        .then((data: ResponseData) => {
          setData({
            total_count: data.total_count,
            items: data.items,
          });
          
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
          setError(true);
        });
    },
    [page, q]
  );

  const handleSubmit = (input?: string) => {
    setFilteredResults(initialState);
    setPage(1);
    fetchData({ input: input });
  };

  const handlePagination = (direction: string) => {
    let offset = page * 31;
    let totalResults = data?.total_count || 0;
    if (direction === "prev" && page >= 2) {
      setPage(page - 1);
    }
    if (direction === "next" && page > 0 && offset < totalResults) {
      setPage(page + 1);
    }
  };

  useEffect(() => {
    fetchData({ input: q, page });
  }, [q, page, fetchData]);

  return (
    <Container id="Search">
      <Header>
        <IconLink to={`/`}>
        </IconLink>
        <SearchBar placeholder="Search..." onSubmit={handleSubmit} value={q} />
      </Header>
      <ResultsWrapper>
        <List>
          <TotalResults>
            {`${data?.total_count || 0} results`}
          </TotalResults>
          {loading ? (
            <Loading>
              <h1>Loading</h1>
              <LoadingDots />
            </Loading>
          ) : data ? (
            <>
              <SearchResults
                filteredResults={filteredResults}
                data={data}
              />
              <Pagination>
                <Icon onClick={() => handlePagination("prev")}>
                  {"< Prev"}
                </Icon>
                Page {page}
                <Icon onClick={() => handlePagination("next")}>
                {"Next >"}
                </Icon>
              </Pagination>
            </>
          ) : null}
        </List>
      </ResultsWrapper>
    </Container>
  );
}

export default Results;

type DotProps = {
  delay?: string;
};