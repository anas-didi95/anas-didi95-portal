import type { IPagination, IUser } from "@/commons/types";
import type { AxiosInstance } from "axios";

export class UserService {
  private readonly graphql: AxiosInstance;

  constructor(graphql: AxiosInstance) {
    this.graphql = graphql;
  }

  async getUsers(
    pageNo: number,
    totalRecordsPerPage: number,
    signal: AbortSignal,
  ) {
    const query = `query GetUsers ($pageNo: Int!, $totalRecordsPerPage: Int) {
      users(pageNo: $pageNo, totalRecordsPerPage: $totalRecordsPerPage) {
        resultList { id username name isDeleted lastSigninDate }
        pagination { pageNo totalRecords totalRecordsPerPage }
      }
    }`;
    const variables = {
      pageNo,
      totalRecordsPerPage,
    };
    const res = await this.graphql.post<{
      data: { users: { resultList: IUser[]; pagination: IPagination } };
    }>("", { query, variables }, { signal });
    return res.data.data.users;
  }

  async getUser(id: string, signal: AbortSignal) {
    const query = `query GetUser($id: ID!) {
      user(id: $id) {
        id isDeleted version createBy createDate updateBy updateDate
        username name lastSigninDate
      }
    }`;
    const variables = { id };
    const res = await this.graphql.post<{ data: { user: IUser } }>(
      "",
      { query, variables },
      { signal },
    );
    return res.data.data.user;
  }
}
