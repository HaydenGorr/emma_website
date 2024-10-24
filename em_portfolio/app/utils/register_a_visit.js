import Cookies from 'js-cookie';

export const register_visit = () => {
    Cookies.set('visited', (Number(Cookies.get('visited')) || 0 ) + 1);
};

export const has_visited_before = () => {
    return Cookies.get('visited') || 0;
};



