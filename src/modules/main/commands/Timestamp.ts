import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';
import { Command } from '../../../types/Command';
import { DateTime } from 'luxon';
import { parseTimeInput } from '../../../utils/time';

const TIMEZONES = [
    // Americas
    { name: 'Los Angeles (PST)', value: 'America/Los_Angeles' },
    { name: 'Denver (MST)', value: 'America/Denver' },
    { name: 'Chicago (CST)', value: 'America/Chicago' },
    { name: 'New York (EST)', value: 'America/New_York' },
    { name: 'São Paulo (BRT)', value: 'America/Sao_Paulo' },
    { name: 'Buenos Aires (ART)', value: 'America/Argentina/Buenos_Aires' },

    // Europe
    { name: 'London (GMT/BST)', value: 'Europe/London' },
    { name: 'Paris/Berlin (CET)', value: 'Europe/Paris' },
    { name: 'Athens/Cairo (EET)', value: 'Europe/Athens' },
    { name: 'Moscow/Istanbul (MSK/TRT)', value: 'Europe/Moscow' },

    // Africa
    { name: 'Lagos (WAT)', value: 'Africa/Lagos' },
    { name: 'Johannesburg (SAST)', value: 'Africa/Johannesburg' },

    // Asia
    { name: 'Dubai (GST)', value: 'Asia/Dubai' },
    { name: 'Karachi (PKT)', value: 'Asia/Karachi' },
    { name: 'Mumbai (IST)', value: 'Asia/Kolkata' },
    { name: 'Dhaka (BST)', value: 'Asia/Dhaka' },
    { name: 'Bangkok/Jakarta (WIB)', value: 'Asia/Bangkok' },
    { name: 'Singapore/HK (SGT/HKT)', value: 'Asia/Singapore' },
    { name: 'Shanghai (CST)', value: 'Asia/Shanghai' },
    { name: 'Tokyo/Seoul (JST/KST)', value: 'Asia/Tokyo' },

    // Australia & Pacific
    { name: 'Perth (AWST)', value: 'Australia/Perth' },
    { name: 'Adelaide (ACST)', value: 'Australia/Adelaide' },
    { name: 'Sydney (AEST)', value: 'Australia/Sydney' },
    { name: 'Auckland (NZST)', value: 'Pacific/Auckland' },

    // UTC
    { name: 'UTC', value: 'UTC' },
];

export const data = new SlashCommandBuilder()
    .setName('timestamp')
    .setDescription('Generate a Discord timestamp for a given time and timezone.')
    .addStringOption(option =>
        option.setName('time')
            .setDescription('Time (24h or 12h, AM/PM, flexible format)')
            .setRequired(true)
    )
    .addStringOption(option => {
        option.setName('timezone')
            .setDescription('Timezone (select from list)')
            .setRequired(false)
            .addChoices(...TIMEZONES);

        return option;
    });

export const execute = async (interaction: ChatInputCommandInteraction) => {
    const timeInput = interaction.options.getString('time', true);
    const tz = interaction.options.getString('timezone') || 'UTC';

    const zone = TIMEZONES.find(t => t.value === tz)?.value;
    if (!zone) {
        console.error(`Unknown timezone: ${tz}`);
        await interaction.reply({ content: 'Unknown timezone. Please select a valid timezone from the list.', ephemeral: true });

        return;
    }

    const parsed = parseTimeInput(timeInput);
    if (!parsed) {
        await interaction.reply({ content: 'Invalid time format. Examples: 12, 12:30, 12pm, 12.30 pm, 12-30AM, 1200am, 930pm', ephemeral: true });

        return;
    }
    const { hour, minute } = parsed;

    const dt = DateTime.now().setZone(zone).set({ hour, minute, second: 0, millisecond: 0 });
    if (!dt.isValid) {
        await interaction.reply({ content: 'Failed to parse time with the given timezone.', ephemeral: true });

        return;
    }

    // Discord timestamp: <t:unix:format>
    const unix = Math.floor(dt.toSeconds());
    const discordTimestamp = `<t:${unix}:t>`;
    
    await interaction.reply({ content: discordTimestamp });
};

export const Timestamp: Command = {
    data,
    execute,
};
