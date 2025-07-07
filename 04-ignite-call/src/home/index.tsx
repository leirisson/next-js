import { Heading, Text } from "@ignite-ui/react";
import { Container, Hero, Preview } from "./styles";
import preview from '@/assets/app-preview.png'
import Image from "next/image";
import ClaimUserNameForm from "./components/ClaimUserNameForm";

export default function Home() {
    return (
        <Container>
            <Hero>
                <Heading size="4xl">Agendamento descomplicado</Heading>
                <Text size="lg">Conecte seu calendário e permita que as pessoas marquem agendamentos no seu tempo livre.</Text>
                <ClaimUserNameForm />
            </Hero>
            <Preview>
                <Image
                    src={preview}
                    height={400}
                    quality={100}
                    priority
                    alt="Calendario simbolizando, aplicação em funcionanamento."
                />
            </Preview>
        </Container>
    );
}
