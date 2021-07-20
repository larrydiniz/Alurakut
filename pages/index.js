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

export default function Home() {
  
  const githubUser = 'larrydiniz';
  const [comunidades, setComunidades] = React.useState([{
    id: '1',
    title: 'Eu odeio acordar cedo',
    image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'
  },
  {
    id: '2',
    title: 'Eu odeio JavaScript',
    image: 'https://i.ibb.co/m9L8G7s/download.jpg'
  }]);
  const pessoasFavoritas = [
    'akelesis',
    'agnysbueno',
    'g-barbosa',
    'MattheusB',
    'mouraCorazim',
    'pablo-matheus',
  ]

  return (
    <>
    <AlurakutMenu />
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
              id: new Date().toISOString(),
              title: dadosForm.get('title'),
              image: dadosForm.get('image'),
            }

            /* comunidades.push('Nova Comunidade') */
            setComunidades([...comunidades, comunidade])
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
        <ProfileRelationsBoxWrapper>
          <h2 className="smallTitle">
            Pessoas da Comunidade ({ pessoasFavoritas.length})
          </h2>

          <ul>
            {pessoasFavoritas.map((itemAtual) => {            
              return (
                <li key={itemAtual}>
                  <a href={`/users/${itemAtual}`}>
                    <img src={`https://github.com/${itemAtual}.png`}/>
                    <span>{itemAtual}</span>
                  </a>
                </li>
              )
            })}
          </ul>
        </ProfileRelationsBoxWrapper>
        <ProfileRelationsBoxWrapper>
          <h2 className="smallTitle">
            Comunidades ({ comunidades.length})
          </h2>

          <ul>
            {comunidades.map((itemAtual) => {            
              return (
                <li key={itemAtual.id}>
                  <a href={`/users/${itemAtual.title}`}>
                    <img src={itemAtual.image}/>
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
