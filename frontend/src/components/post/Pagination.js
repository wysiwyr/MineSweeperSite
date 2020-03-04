import React from "react";
import styled from "styled-components";
import qs from "qs";
import Button from "../common/Button";

const StyledPagination = styled.div`
    width: 320px;
    margin: 0 auto;
    display: felx;
    justify-content: space-between;
    margin-bottom: 3rem;
`;

const PageNumber = styled.div``;

const buildLink = ({page, username, tag, level}) => {
    const query = qs.stringify({page, tag, level});
    return username ? `/@${username}?${query}` : `/?${query}`;
};

const Pagination = ({page, lastPage, username, tag, level}) => {
    return (
        <StyledPagination>
            <Button
                disabled={page === 1}
                to={
                    page === 1 ? undefined : buildLink({page: page - 1, username, tag, level})
                }
            >
                이전
            </Button>
            <PageNumber>{page}</PageNumber>
            <Button
                disabled={lastPage === 1 || page === lastPage}
                to={
                    lastPage === 1
                    ? undefined
                    : page === lastPage
                        ? undefined
                        : buildLink({page: page + 1, username, tag, level})
                }
            >
                다음
            </Button>
        </StyledPagination>
    )
};

export default Pagination;
