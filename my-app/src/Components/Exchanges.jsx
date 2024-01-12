import React, { useEffect, useState } from 'react'
import { Container, HStack , VStack  ,  Image ,Heading ,Text} from '@chakra-ui/react'
import axios from 'axios'
import { server } from '../index'
import Loader  from './Loader'
import Errorcomp from './Errorcomp'
 
const Exchanges = () => {


    const[exchanges,setexchanges] = useState([]);
    const[loading,setloading] = useState(true);
    const[Error,setError] = useState(false);


    useEffect(()=> {

        

        const fetchExchanges = async () =>{


            try {
                const { data }  = await axios.get(`${server}/exchanges`);
                setloading(false);
                 setexchanges(data);
                
            } catch (error) {

                setError(true);
                setloading(false);
                
            }
         
        };

  fetchExchanges();
    },[])


    if(Error) 
    return(  <Errorcomp/>);


  return (

    

  <Container maxW={"container.xl"}>
    
    

    {loading ? <Loader/> :
    
    <>


    <HStack wrap={"wrap"} justifyContent={"space-evenly"} >

        {exchanges.map((i)=> (

            <Exchangechart name={i.name} img={i.image} rank={i.trust_score_rank}  url={i.url} />

        ))}
    </HStack>

    </>}
    
       </Container>


  );
};

const Exchangechart = ({name,img,rank,url}) =>(
    <a href={url} target={'_blank'}>

<VStack
      w={"52"}
      shadow={"lg"}
      p={"8"}
      borderRadius={"lg"}
      transition={"all 0.3s"}
      m={"4"}
      css={{
        "&:hover": {
          transform: "scale(1.1)",
        },
      }}
    >
      <Image
        src={img}
        w={"10"}
        h={"10"}
        objectFit={"contain"}
        alt={"Exchange"}
      />
      <Heading size={"md"} noOfLines={1}>
        {rank}
      </Heading>

      <Text noOfLines={1}>{name}</Text>
    </VStack>


    </a>


)

export default Exchanges
