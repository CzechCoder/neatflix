import { FC, FormEvent, SyntheticEvent, useState } from "react";
import { Box, Typography } from "@mui/material";
import { HOME_CARDS } from "../../data/home-cards";
import { HOME_ACCORDIONS } from "../../data/home-accordions";
import { HomeCard, HomeCardProps } from "../../components/home-card";
import { AccordionProps, HomeAccordion } from "../../components/home-accordion";
import { SignupDialog } from "../../components/signup-dialog";
import { SignupForm } from "../../components/signup-form";
import { HomeHero } from "../../components/home-hero";
import styles from "./index.module.css";
import { Footer } from "../../components/footer";

export const HomePage: FC = () => {
  const [expandedAccordion, setExpandedAccordion] = useState<string | false>(
    false
  );
  const [signupDialogOpen, setSignupDialogOpen] = useState<boolean>(false);

  const toggleAccordion =
    (panel: string) => (e: SyntheticEvent, isExpanded: boolean) => {
      setExpandedAccordion(isExpanded ? panel : false);
    };

  const handleSignUp = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSignupDialogOpen(true);
  };

  return (
    <>
      <HomeHero handleSignUp={handleSignUp} />
      {HOME_CARDS.map((card: HomeCardProps) => (
        <HomeCard
          title={card.title}
          subtitle={card.subtitle}
          image={card.image}
          reverse={card.reverse}
          key={card.title}
        />
      ))}
      <Box className={styles.faqContainer}>
        <div className="home-divider" />
        <Typography
          sx={{
            textAlign: "center",
            mb: "2rem",
            typography: { sm: "h1_lg", xs: "h1_sm" },
          }}
        >
          Frequently Asked Questions
        </Typography>
        <Box className={styles.faqWrapper}>
          {HOME_ACCORDIONS.map((accordion: AccordionProps, i: number) => (
            <HomeAccordion
              expanded={expandedAccordion}
              handleChange={toggleAccordion}
              title={accordion.title}
              text={accordion.text}
              number={i + 1}
              key={accordion.title}
            />
          ))}
        </Box>
        <SignupForm handleSignUp={handleSignUp} />
      </Box>
      <SignupDialog open={signupDialogOpen} handleClose={setSignupDialogOpen} />
      <div className="home-divider" style={{ position: "relative" }} />
      <Footer width="narrow" />
    </>
  );
};
