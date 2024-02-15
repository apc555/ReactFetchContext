# Exercicios

## Utilizando o contexto

> Lembra utilizar `useContext`, `createContext` e o `<variable.Provider value={....}>`.

- Crea un compoñente onde teñas diferentes compoñentes e nun deles utilices unha variable estado pasada utilizando `useContext`.
- Do anterior, separa os compoñentes e utiliza para cada un, un arquivo e expórtao, de tal xeito, que fagas o mesmo que no anterior.
    - Neste utiliza nun caso a palabra clave `{children}` para introducilos compoñentes.
    - E noutro caso, utiliza sen a palabra clave `{children}`

## Utilizando useEffect

> Isto pode ser unha petición `[text](https://randomuser.me/api/?gender=female&results=10&nat=us)`, no parámetro `results` podes introducir os que queiras, `nat` indica a nacionalidade, se queres vai a súa páxina e mira cómo podes cambiar a nacionalidade e podes pedir outros usuarios igual que no xénero pode ser masculino, que é indicado no parámetro `gender`.

> As peticións deberás controlas mediante un botón, e nel variar o estado para solicitar o dato

- Crea un compoñente que solicite sólo 1 dato a unha API de usuarios, neste caso vamos utilizar a API de `[text](https://randomuser.me/)`
- Unha vez que o teñas, serías capaz de crear unha tarxeta do usuario usando os seus datos?. 
    - Se é así, xenera tamén un botón que faga que se visualice ou non dita tarxeta.
- Crea un compoñente que solicite sólo 10 dato a unha API de usuarios, neste caso vamos utilizar a API de `[text](https://randomuser.me/)`
- Unha vez que os teñas, serías capaz de crear unha tarxeta de cada usuario usando os seus datos?