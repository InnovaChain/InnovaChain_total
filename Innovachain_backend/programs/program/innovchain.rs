use anchor_lang::prelude::*;

declare_id!("5SutcEVK2AZzpo7JG82kefScv9W6UjGLLaqRoC1feSXZ");

#[program]
pub mod innovchain_program {
    use super::*;

    pub fn insert(ctx: Context<Insert>, watermark: String) -> Result<()> {
        if ctx.accounts.watermark_account.data.is_empty() {
            ctx.accounts.watermark_account.data = vec![watermark];
        } else {
            ctx.accounts.watermark_account.data.push(watermark);
        }
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Insert<'info> {
    pub system_program: Program<'info, System>,

    #[account(
        init_if_needed,
        payer = user,
        space = 8 + 32*100 + 8,
        seeds = [b"watermark_account".as_ref(), user.key().as_ref()],
        bump
    )]
    pub watermark_account: Account<'info, WatermarkAccount>,

    #[account(mut)]
    pub user: Signer<'info>,
}

#[account]
pub struct WatermarkAccount {
    pub data: Vec<String>,
}
