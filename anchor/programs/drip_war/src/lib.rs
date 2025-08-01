use anchor_lang::prelude::*;

declare_id!("Drip111111111111111111111111111111111111111");

#[program]
pub mod drip_war {
    use super::*;

    pub fn initialize(_ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }

    pub fn play_game(
        ctx: Context<PlayGame>,
        p1_cards: Vec<u8>,
        p2_cards: Vec<u8>,
    ) -> Result<()> {
        let mut p1_score: u8 = p1_cards.iter().sum();
        let mut p2_score: u8 = p2_cards.iter().sum();

        p1_score %= 10;
        p2_score %= 10;

        let result = if p1_score > p2_score {
            1
        } else if p2_score > p1_score {
            2
        } else {
            0
        };

        msg!("P1: {}, P2: {}, Result: {}", p1_score, p2_score, result);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}

#[derive(Accounts)]
pub struct PlayGame {}
