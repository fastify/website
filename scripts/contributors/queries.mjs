// @ts-check
/**
 * GraphQL documents used to collect Fastify organization activity.
 */

export const PULL_REQUEST_SEARCH = `
  query RecentPullRequests($searchQuery: String!, $cursor: String) {
    search(query: $searchQuery, type: ISSUE, first: 100, after: $cursor) {
      issueCount
      pageInfo { hasNextPage endCursor }
      nodes {
        ... on PullRequest {
          id
          number
          createdAt
          mergedAt
          updatedAt
          author { __typename login avatarUrl url }
          repository { nameWithOwner isPrivate }
          reviews(first: 100) {
            totalCount
            pageInfo { hasNextPage endCursor }
            nodes {
              id
              submittedAt
              author { __typename login avatarUrl url }
            }
          }
        }
      }
    }
  }
`;

export const ISSUE_SEARCH = `
  query RecentIssues($searchQuery: String!, $cursor: String) {
    search(query: $searchQuery, type: ISSUE, first: 100, after: $cursor) {
      issueCount
      pageInfo { hasNextPage endCursor }
      nodes {
        ... on Issue {
          id
          createdAt
          author { __typename login avatarUrl url }
          repository { nameWithOwner isPrivate }
        }
      }
    }
  }
`;

export const MORE_REVIEWS = `
  query MoreReviews($id: ID!, $cursor: String) {
    node(id: $id) {
      ... on PullRequest {
        reviews(first: 100, after: $cursor) {
          totalCount
          pageInfo { hasNextPage endCursor }
          nodes {
            id
            submittedAt
            author { __typename login avatarUrl url }
          }
        }
      }
    }
  }
`;
