export default {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  'POST  /api/forms': (req: any, res: { send: (arg0: { message: string }) => void }) => {
    res.send({ message: 'Ok' });
  },
};
