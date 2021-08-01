import React from 'react';
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations.js';

function ProfileSidebar(props){
  return (
    <Box as="aside">
      <img src={`https://github.com/${props.githubUser}.png`} style={{ borderRadius: '8px' }}/>
      <hr/>

      <a className="boxLink" href={`https://github.com/${props.githubUser}`}>
        @{props.githubUser}
      </a>
      <hr/>

      <AlurakutProfileSidebarMenuDefault/>
    </Box>
  )
}

function ProfileRelationsBox(props){
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {props.title} ({props.items.length})
      </h2>

      {/* <ul>
        {props.items.map((itemAtual) => {            
          return (
            <li key={itemAtual}>
              <a href={`/users/${itemAtual}`}>
                <img src={`https://github.com/${itemAtual}.png`}/>
                <span>{itemAtual}</span>
              </a>
            </li>
          )
        })}
      </ul> */}
    </ProfileRelationsBoxWrapper>
  )
}

export default function Home() {
  
  const githubUser = 'larrydiniz';
  const [comunidades, setComunidades] = React.useState([]);

  const pessoasFavoritas = [
    'akelesis',
    'agnysbueno',
    'g-barbosa',
    'MattheusB',
    'mouraCorazim',
    'pablo-matheus',
  ]

  const [seguidores, setSeguidores] = React.useState([])
  React.useEffect(function() {
    fetch('https://api.github.com/users/larrydiniz/followers')
    .then( (res) => res.json() )
    .then( (resCompleta) => setSeguidores(resCompleta) )

    //API GraphQL
    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Authorization': '9c0385acfbb378a11e101c6b157331',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ 'query' : `query {
          allCommunities {
            id
            title
            imageUrl
            creatorSlug
          }
        }`})   
    })
    .then( (res) => res.json() )
    .then( (resCompleta) => {
      const comunidadesDato = resCompleta.data.allCommunities;
      setComunidades(comunidadesDato);
      console.log(resCompleta)
    
    } )

  }, []) 


  return (
    <>
    <AlurakutMenu githubUser={githubUser} />
    <MainGrid>
      {/* style="grid-area: profileArea" */}
      <div className="profileArea" style={{ gridArea: 'profileArea' }}>
        <ProfileSidebar githubUser={githubUser} />
      </div>
      <div style={{ gridArea: 'welcomeArea' }}>
        <Box>
          <h1 className="title">Bem vindo(a)</h1>
          <OrkutNostalgicIconSet/>
        </Box>

        <Box>
          <h2 className="smallTitle">O que você deseja fazer?</h2>
          <form onSubmit={function handleCriaComunidade(e){
            e.preventDefault(); 
            const dadosForm = new FormData(e.target);
            const comunidade = {
              title: dadosForm.get('title'),
              imageUrl: dadosForm.get('image'),
              creatorSlug: githubUser
            }

            fetch('/api/comunidades', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(comunidade)
            })
            .then(async (res) => {
              const dados = await res.json();
              const comunidade = dados.novoRegistro;
              setComunidades([...comunidades, comunidade])
            })
          }}>
            <div>
              <input 
                placeholder="Qual vai ser o nome da sua comunidade?" 
                name="title" 
                aria-label="Qual vai ser o nome da sua comunidade?"
              />
            </div>
            <div>
              <input 
                placeholder="URL da imagem de capa" 
                name="image" 
                aria-label="URL da imagem de capa"
              />
            </div>
            <button>
              Criar comunidade
            </button>
          </form>
        </Box>
      </div>
      <div style={{ gridArea: 'profileRelationsArea' }}>
        <ProfileRelationsBox title="Seguidores" items={seguidores} />

        <ProfileRelationsBox title="Pessoas da Comunidade" items={pessoasFavoritas}/>

        <ProfileRelationsBoxWrapper>
          <h2 className="smallTitle">
            Comunidades ({ comunidades.length})
          </h2>

          <ul>
            {comunidades.map((itemAtual) => {            
              return (
                <li key={itemAtual.id}>
                  <a href={`/users/${itemAtual.id}`}>
                    <img src={itemAtual.imageUrl}/>
                    <span>{itemAtual.title}</span>
                  </a>
                </li>
              )
            })}
          </ul>
        </ProfileRelationsBoxWrapper>
      </div>
    </MainGrid>
    </>
  )
}
