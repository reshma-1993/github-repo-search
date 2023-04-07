import React from "react";
import styled from "styled-components";
import { Item, ResponseData } from "../types";
import { timeSince } from "../utils/time";

const Results = styled.div`
  display: flex;
  flex-direction: column;
`;

const List = styled.div``;

const StyledLink = styled.a`
  font-size: 1rem;
  font-weight: 700;
  text-decoration: none;
  color: #0d4436;
  &:hover {
    text-decoration: underline;
  }
`;
const Repo = styled.div`
  padding: 1rem 0 1rem 0;
  border-bottom: 1px solid black;
`;

const Description = styled.div`
  font-size: 0.9rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const Stars = styled.div`
  font-size: 0.7rem;
`;
const Forks = styled.div`
  font-size: 0.7rem;
`;
const Language = styled.div``;
const UpdatedAt = styled.div``;
const Details = styled.div`
  font-size: 0.7rem;
  display: flex;
  gap: 1rem;
  line-height: 1.25rem;
`;

function SearchResults({ filteredResults, data }: Props) {
  return (
    <Results>
      <List>
        {(filteredResults?.items?.length ? filteredResults?.items : data?.items || []).map(
          (item: Item) => {
            const {
              stargazers_count,
              language,
              full_name,
              id,
              updated_at,
              forks_count,
              description,
              html_url,
            } = item;
            let updatedAt = new Date(updated_at).toDateString();
            return (
              <Repo key={id}>
                <StyledLink
                  href={html_url}
                  target="_blank"
                >
                  {full_name}
                </StyledLink>
                {description && <Description>{item.description}</Description>}
                <Details>
                  <Stars>
                    {`Stars: ${stargazers_count || 0}`}
                  </Stars>
                  <Forks>
                    {`Forks: ${forks_count || 0}`}
                  </Forks>
                  {language && <Language>{language || ""}</Language>}
                  <UpdatedAt>
                    {updatedAt ? `Last updated: ${timeSince(new Date(updatedAt))}` : ""}
                  </UpdatedAt>
                </Details>
              </Repo>
            );
          }
        )}
      </List>
    </Results>
  );
}

export default SearchResults;

type Props = {
  filteredResults: ResponseData;
  data: ResponseData;
}