import Cookies from 'js-cookie';

export const register_visit = () => {
    Cookies.set('visited', true);
};

export const has_visited_before = () => {
    return !!Cookies.get('visited');
};



