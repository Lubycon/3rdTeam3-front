import { useEffect } from 'react';
import client from 'api/client';
import { getJWT } from 'api/auth';
import { useHistory } from 'react-router';
import useQueryStringAndParam from 'hooks';

const Auth = () => {
  const history = useHistory();
  const { authorizationToken: tempToken } = useQueryStringAndParam<{
    authorizationToken: string;
  }>().query;

  useEffect(() => {
    if (tempToken === undefined) {
      return;
    }
    getJWT(tempToken)
      .then((res) => {
        if (res.headers.authorization && res.headers.authorization.split(' ')[0] === 'Bearer') {
          const jwt = res.headers.authorization.split(' ')[1];
          client.defaults.headers = {
            Authorization: `Bearer ${jwt}`,
          };
          history.push('/main');
        }
      })
      .catch((err) => {
        history.push('/login');
      });
  }, [tempToken]);
  return <div>로그인 중...</div>;
};

export default Auth;