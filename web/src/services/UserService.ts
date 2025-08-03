import type { IPagination, IUser } from "@/commons/types";
import type { AxiosInstance } from "axios";

export class UserService {
  private readonly graphql: AxiosInstance;

  constructor(graphql: AxiosInstance) {
    this.graphql = graphql;
  }

  async search(
    pageNo: number,
    totalRecordsPerPage: number,
    signal: AbortSignal,
  ) {
    const query = `query ($pageNo: Int!, $totalRecordsPerPage: Int) {
      users(pageNo: $pageNo, totalRecordsPerPage: $totalRecordsPerPage) {
        resultList { id username name isDeleted updateDate }
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
}
