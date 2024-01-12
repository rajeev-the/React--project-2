import React, { useEffect, useState } from 'react'
import { Container, HStack , VStack  ,  Image ,Heading ,Text} from '@chakra-ui/react'
import axios from 'axios'
import { server } from '../index'
import Loader  from './Loader'
import Errorcomp from './Errorcomp'
 
const Coins = () => {


    const[exchanges,setexchanges] = useState([]);
    const[loading,setloading] = useState(true);
    const[Error,setError] = useState(false);
    const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("inr");

  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";



    useEffect(()=> {

        

        const fetchExchanges = async () =>{


            try {
                const { data }  = await axios.get(`${server}\/coins/markets?vs_currency=${currency}&page=${page}`);
                setloading(false);
                 setexchanges(data);
                
            } catch (error) {

                setError(true);
                setloading(false);
                
            }
         
        };

  fetchExchanges();
    },[currency, page])


    if(Error) 
    return(  <Errorcomp/>);


  return (

    

  <Container maxW={"container.xl"}>
    
    

    {loading ? <Loader/> :
    
    <>


    <HStack wrap={"wrap"} justifyContent={"space-evenly"} >

        {exchanges.map((i)=> (

            <Exchangechart name={i.name} img={i.image}   url={i.url}  price={i.current_price} currencySymbol={currencySymbol} />

        ))}
    </HStack>

    </>}
    
       </Container>


  );
};

const Exchangechart = ({name,img,url , price , currencySymbol = "₹"}) =>(
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
    
    <Text noOfLines={1}>{name}</Text>
      <Text noOfLines={1}>{ price ? `${currencySymbol}${price}` : "NA"}</Text>
    </VStack>


    </a>


)

export default Coins