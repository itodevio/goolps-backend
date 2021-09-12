import mongoose from 'mongoose';

mongoose.connect(process.env.MONGOOSE_URI as string);

export default mongoose;
