import { useLocation as useDocusaurusLocation } from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export const useLocation = (): ReturnType<typeof useDocusaurusLocation> => {
    const {
        siteConfig: {
            trailingSlash,
        },
    } = useDocusaurusContext();
    const { pathname, ...rest } = useDocusaurusLocation();

    return {
        ...rest,
        pathname: trailingSlash ? pathname.slice(0, -1) : pathname,
    };
};
