import Settings from '../models/Settings.js';

// Get current settings (creates default if it doesn't exist)
export const getSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({});
    }
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching settings' });
  }
};

// Update settings
export const updateSettings = async (req, res) => {
  try {
    const { registrationFee, autismPackageFee, registrationFeeEnabled, autismPackageFeeEnabled } = req.body;
    let settings = await Settings.findOne();
    
    if (!settings) {
      settings = await Settings.create({ 
        registrationFee, 
        autismPackageFee, 
        registrationFeeEnabled: registrationFeeEnabled ?? true, 
        autismPackageFeeEnabled: autismPackageFeeEnabled ?? true 
      });
    } else {
      if (registrationFee !== undefined) settings.registrationFee = registrationFee;
      if (autismPackageFee !== undefined) settings.autismPackageFee = autismPackageFee;
      if (registrationFeeEnabled !== undefined) settings.registrationFeeEnabled = registrationFeeEnabled;
      if (autismPackageFeeEnabled !== undefined) settings.autismPackageFeeEnabled = autismPackageFeeEnabled;
      await settings.save();
    }
    
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: 'Error updating settings' });
  }
};
