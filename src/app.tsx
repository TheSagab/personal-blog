import React from "react";
import { SWRConfig } from "swr";
import { Helmet } from "react-helmet";
import { Route, Switch, Link, useRoute } from "wouter";
import ultraCache from "ultra/cache";
import { Cache } from "https://deno.land/x/ultra/src/types.ts";

const options = (cache: Cache) => ({
  provider: () => ultraCache(cache),
  suspense: true,
});

const ActiveLink = (props) => {
  const [isActive] = useRoute(props.href);
  return (
    <Link {...props}>
      <a href="/" className={isActive ? "active" : ""}>
        {props.children}
      </a>
    </Link>
  );
};

const Ultra = ({ cache }: { cache: Cache }) => {
  return (
    <SWRConfig value={options(cache)}>
      <Helmet>
        <title>Ultra</title>
        <link rel="stylesheet" href="/style.css" />
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
      </Helmet>
      <main>
      <nav>
        <ActiveLink href="/">Home</ActiveLink>
        <ActiveLink href="/portofolio">Portofolio</ActiveLink>
        <ActiveLink href="/about">About</ActiveLink>
      </nav>
        <Switch>
          <Route path="/">
          <article>
            <h1>Hello world!</h1>

            <p>Nothing at the moment.</p>
          </article>
          </Route>
          <Route>
          <article>
            <h1>404. Are you lost?</h1>
          </article>
          </Route>
        </Switch>
      </main>
    </SWRConfig>
  );
};

export default Ultra;
