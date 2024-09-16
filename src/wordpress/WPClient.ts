import env from "@/env";
import { stringify } from "qs";
import { WPBasePost, WPPage, WPPost } from "./wordpress";

type Language = "en" | "zh-hans";
// const defaultLanguage = "en";

type WpClientConfig = {
  baseURL: string;
  timeout: number;
  headers: HeadersInit;
};

type WpClientFetchInit = RequestInit & {
  params?: unknown;
};

export class HttpError extends Error {
  public response;

  public init;

  constructor(response: Response, init: WpClientFetchInit) {
    super(
      `Got HTTP error ${response.status} while doing ${init.method || "GET"} ${
        response.url
      }`
    );
    this.response = response;
    this.init = init;
  }
}

export default class WPClient {
  private config: WpClientConfig;
  private locale?: Language;

  constructor(config: Partial<WpClientConfig>) {
    const fullConfig: WpClientConfig = {
      baseURL: "",
      timeout: 30000,
      headers: {},
      ...config,
    };
    fullConfig.baseURL = fullConfig.baseURL.replace(/\/$/, "");
    this.config = fullConfig;
    this.locale = undefined;
  }

  public setLocale(locale: Language) {
    this.locale = locale;
    return this;
  }

  public async fetch(input: string, init?: WpClientFetchInit) {
    const headers = new Headers(init?.headers || {});
    const baseHeaders = new Headers(this.config.headers);
    baseHeaders.forEach((key, value) => headers.set(key, value));

    let url = "";
    if (input.startsWith("http")) {
      url = input;
    } else {
      const urlParams = init?.params
        ? stringify(init.params, { addQueryPrefix: true })
        : "";
      url = `${this.config.baseURL}${input}${urlParams}`;

      // maybe append `lang`
      if (this.locale && !url.includes("lang")) {
        url = `${url}${url.includes("?") ? "&" : "?"}lang=${this.locale}`;
      }
    }

    const newInit = { ...init, headers };

    console.log(`WPCLient:fetch: ${url}`);

    try {
      // https://nextjs.org/docs/app/building-your-application/caching#data-cache
      const response = await fetch(url, {
        next: {
          revalidate: 10,
        },
        ...newInit,
      });
      if (!response.ok) {
        throw new HttpError(response, newInit);
      }
      return response;
    } catch (e) {
      console.log(`Failed to fetch ${url}`);
      throw e;
    }
  }

  public async getOnePost<T extends WPBasePost>(params: {
    postType: string;
    slug?: string;
    id?: number | string;
  }): Promise<T | null> {
    try {
      const { slug, id } = params;
      if (slug) {
        const response = await this.fetch(`/wp-json/wp/v2/${params.postType}`, {
          params: { slug },
        });
        const data = (await response.json()) as T[];
        if (data.length > 0) {
          return data[0];
        }
        return null;
      }
      if (id) {
        const response = await this.fetch(
          `/wp-json/wp/v2/${params.postType}/${id}`
        );
        const data = (await response.json()) as T;
        return data;
      }
      throw new Error(`Missing "slug" or "id" in WpClient.getPage.`);
    } catch (e) {
      if (e instanceof HttpError) {
        if (e.response.status === 404) return null;
      }
      throw e;
    }
  }

  public async getPage<T extends WPPage>(params: {
    slug?: string;
    id?: number | string;
  }): Promise<T | null> {
    return this.getOnePost<T>({ ...params, postType: "pages" });
  }

  public async getPost<T extends WPPost>(params: {
    slug?: string;
    id?: number | string;
  }): Promise<T | null> {
    return this.getOnePost<T>({ ...params, postType: "posts" });
  }
}

export const wpClient = new WPClient({
  baseURL: env.WordPressRestAPI,
});
